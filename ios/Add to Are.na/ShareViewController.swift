//
//  ShareViewController.swift
//  Add to Are.na
//
//  Created by Charles Broskoski on 1/30/18.
//  Copyright © 2018 650 Industries, Inc. All rights reserved.
//

import UIKit
import Social
import MobileCoreServices
import Apollo
import AWSS3

extension NSItemProvider {
    var isURL: Bool {
        return hasItemConformingToTypeIdentifier(kUTTypeURL as String)
    }
    var isText: Bool {
        return hasItemConformingToTypeIdentifier(kUTTypeText as String)
    }
    var isImage: Bool {
        return hasItemConformingToTypeIdentifier(kUTTypeImage as String)
    }
}

class ShareViewController: SLComposeServiceViewController {
    private var apollo: ApolloClient?
    private var authToken = String()
    private var appToken = String()
    private var userChannels = [Channel]()
    fileprivate var selectedChannel: Channel!
    private var urlString: String?
    private var textString: String?
    private var imageString: String?
    
    // Set the top bar styles
    func setupUI() {
        let imageView = UIImageView(image: UIImage(named: "logo.png"))
        imageView.contentMode = .scaleAspectFit
        navigationItem.titleView = imageView
        navigationController?.navigationBar.topItem?.titleView = imageView
        navigationController?.navigationBar.tintColor = UIColor.black
        navigationController?.navigationBar.backgroundColor = UIColor.white
        navigationController?.view.backgroundColor = UIColor.white
        navigationController?.navigationBar.topItem?.rightBarButtonItem?.title = "Connect"
    }
    
    func getDefaults() {
        let userDefaults = UserDefaults(suiteName: "group.com.arenashare")
        
        if let authToken = userDefaults?.string(forKey: "authToken") {
            print("Auth Token: \(authToken)")
            self.authToken = authToken
        }
        if let appToken = userDefaults?.string(forKey: "appToken") {
            print("App Token: \(appToken)")
            self.appToken = appToken
        }
    }
    
    func setupApollo() {
        let configuration = URLSessionConfiguration.default
        
        print("self.appToken \(self.appToken)")
        print("self.authToken \(self.authToken)")
        
        configuration.httpAdditionalHeaders = [
            "X-APP-TOKEN": self.appToken,
            "X-AUTH-TOKEN": self.authToken
        ]
        
        let url = URL(string: "https://api.are.na/graphql")!
        let transport = HTTPNetworkTransport(url: url, configuration: configuration)
        self.apollo = ApolloClient(networkTransport: transport)
    }
    
    func fetchRecentConnections() {
        self.apollo?.fetch(query: RecentConnectionsQuery()) { (result, error) in
            if let error = error {
                self.showAuthAlert()
                NSLog("Error fetching connections: \(error.localizedDescription)")
            }
            
            let recentConnections = result?.data?.me?.recentConnections
            recentConnections?.forEach {
                let channel = Channel()
                channel.id = $0?.id
                channel.title = $0?.title
                channel.visibility = $0?.visibility
                self.userChannels.append(channel)
            }
            self.selectedChannel = self.userChannels.first
            self.reloadConfigurationItems()
            self.validateContent()
        }
    }
    
    func getContext() {
        let extensionItem = extensionContext?.inputItems[0] as! NSExtensionItem
        let contentTypeURL = kUTTypeURL as String
        let contentTypeText = kUTTypeText as String
        let contentTypeImage = kUTTypeImage as String
        
        for attachment in extensionItem.attachments as! [NSItemProvider] {
            if attachment.isImage {
                attachment.loadItem(forTypeIdentifier: contentTypeImage, options: nil, completionHandler:  { (results, error) in
                    let image = results as! URL
                    self.imageString = image.absoluteString
                })
            }
            if attachment.isURL {
                attachment.loadItem(forTypeIdentifier: contentTypeURL, options: nil, completionHandler: { (results, error) in
                    let url = results as! URL?
                    self.urlString = url!.absoluteString
                })
            }
            if attachment.isText {
                attachment.loadItem(forTypeIdentifier: contentTypeText, options: nil, completionHandler: { (results, error) in
                    let text = results as! String
                    self.textString = text
                    _ = self.isContentValid()
                })
            }
        }
    }
    
    func showAuthAlert() {
        let alert = UIAlertController(title: "Access Denied", message: "Please log in through the Are.na app and try again.", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: .default))
        self.present(alert, animated: true, completion: nil)

    }

    override func isContentValid() -> Bool {
        if ((selectedChannel != nil) && (selectedChannel.id != nil)) {
            return true
        }
        return false
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        getContext()
    }
    
    override func presentationAnimationDidFinish() {
        getDefaults()
        setupApollo()
        fetchRecentConnections()
    }

    override func didSelectPost() {
        var mutation = CreateBlockMutationMutation(channel_ids: [GraphQLID(describing: selectedChannel.id!)], description: self.contentText, source_url: urlString)
        
        // Content is text
        if ((urlString) == nil && (self.contentText) != nil) {
            mutation = CreateBlockMutationMutation(channel_ids: [GraphQLID(describing: selectedChannel.id!)], content: self.contentText)
        }
        // If content is not an image
        if ((self.imageString) == nil) {
            apollo?.perform(mutation: mutation) { (result, error) in
                self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
            }
        // If content is an image, get an s3 policy, then upload the image and create a block
        } else {
            print("going to be uploading an image")
            apollo?.fetch(query: FetchPolicyQuery()) { (result, error) in
                print("GOT POLICY")
                let key = result?.data?.me?.policy?.key
                let bucket = result?.data?.me?.policy?.bucket
                let transferUtility = AWSS3TransferUtility.default()
                let url = URL(string: self.imageString!)
                let data = try? Data(contentsOf: url!)
                
                print("Got some fucking data")
                
                let expression = AWSS3TransferUtilityUploadExpression()
                
                var completionHandler: AWSS3TransferUtilityUploadCompletionHandlerBlock?
                completionHandler = { (task, error) -> Void in
                    DispatchQueue.main.async(execute: {
                        print("TASK \(task)")
                        print("ERROR \(error?.localizedDescription)")
                        // Do something e.g. Alert a user for transfer completion.
                        // On failed uploads, `error` contains the error object.
                    })
                }
 
                transferUtility.uploadData(
                    data!,
                    bucket: bucket!,
                    key: key!,
                    contentType: "image/png",
                    expression: expression,
                    completionHandler: completionHandler).continueWith {
                        (task) -> AnyObject! in
                        if let error = task.error {
                            print("Error: \(error.localizedDescription)")
                        }
                    
                        if let _ = task.result {
                            print("RESULT \(task.result?.request)")
                            // Do something with uploadTask.
                        }
                        return nil;
                }
            }
        }
        
    }

    override func configurationItems() -> [Any]! {
        if let channel = SLComposeSheetConfigurationItem() {
            channel.title = "Channel"
            channel.value = selectedChannel?.title
            channel.tapHandler = {
                let vc = ShareSelectViewController()
                vc.userChannels = self.userChannels
                vc.delegate = self
                self.pushConfigurationViewController(vc)
            }
            return [channel]
        }
        return nil
    }
}

extension ShareViewController: ShareSelectViewControllerDelegate {
    func selected(channel: Channel) {
        selectedChannel = channel
        reloadConfigurationItems()
        popConfigurationViewController()
    }
}
