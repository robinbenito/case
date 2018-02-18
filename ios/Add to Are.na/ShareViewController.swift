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
import AWSCore
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
    // For fetching data via Apollo
    private var apollo: ApolloClient?
    private var authToken = String()
    private var appToken = String()
    
    // Label for placeholder when text field is empty
    var placeholderLabel : UILabel!
    
    // Arrays that hold fetched channels
    private var recentConnections = [Channel]()
    private var userChannels = [Channel]()
    
    // Values to hold the block that will be created
    private var selectedChannel: Channel!
    private var urlString: String?
    private var textString: String?
    private var sourceURL: String?
    private var imageString: String?
    
    // Values for uploading images to S3
    private var groupID = String()
    private var AWSBucket = String()
    private var AWSPoolId = String()
    private var AWSTransferKey = String()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setConfig()
        setupUI()
        getShareContext()
    }
    
    override func presentationAnimationDidFinish() {
        getDefaults()
        setupApollo()
        fetchRecentConnections()
    }
    
    override func isContentValid() -> Bool {
        if ((selectedChannel != nil) && (selectedChannel.id != nil)) {
            return true
        }
        return false
    }
    
    override func didSelectPost() {
        var mutation = CreateBlockMutationMutation(channel_ids: [GraphQLID(describing: selectedChannel.id!)], description: self.contentText, source_url: urlString)
        
        // Content is text
        if ((urlString) == nil && (self.contentText) != nil) {
            mutation = CreateBlockMutationMutation(channel_ids: [GraphQLID(describing: selectedChannel.id!)], content: self.contentText, description: "")
        }
        // If content is not an image
        if ((self.imageString) == nil) {
            apollo?.perform(mutation: mutation) { (result, error) in
                self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
            }
            // If content is an image, then upload the image and create a block
        } else {
            let bucket = self.AWSBucket
            let url = URL(string: self.imageString!)!
            let data = try? Data(contentsOf: url)
            let uuid = NSUUID().uuidString.lowercased()
            let key = "\(uuid)/\(url.lastPathComponent)"
            
            let credentialProvider = AWSCognitoCredentialsProvider(regionType: .USEast1, identityPoolId: self.AWSPoolId)
            let configuration = AWSServiceConfiguration(region: .USEast1, credentialsProvider: credentialProvider)
            configuration?.sharedContainerIdentifier = self.groupID
            
            AWSServiceManager.default().defaultServiceConfiguration = configuration
            AWSS3TransferUtility.register(with: configuration!, forKey: self.AWSTransferKey)
            let transferUtility = AWSS3TransferUtility.s3TransferUtility(forKey: self.AWSTransferKey)
            let expression = AWSS3TransferUtilityUploadExpression()
            expression.setValue("public-read", forRequestHeader: "x-amz-acl")
            
            var completionHandler: AWSS3TransferUtilityUploadCompletionHandlerBlock?
            completionHandler = { (task, error) -> Void in
                DispatchQueue.main.async(execute: {
                    let url = URL(string: "https://s3.amazonaws.com/")?.appendingPathComponent(bucket)
                    let publicURL = url?.appendingPathComponent(key).absoluteString
                    
                    // Create image in Are.na
                    mutation.source_url = publicURL
                    self.apollo?.perform(mutation: mutation) { (result, error) in }
                    
                    // Remove reference to transferUtility
                    AWSS3TransferUtility.remove(forKey: self.AWSTransferKey)
                    self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                })
            }
            
            transferUtility.uploadData(
                data!,
                bucket: bucket,
                key: key,
                contentType: "image/png",
                expression: expression,
                completionHandler: completionHandler).continueWith { (task) -> AnyObject! in
                    if let error = task.error {
                        print("Error: \(error.localizedDescription)")
                        self.showAlert(message: "Error uploading file \(error.localizedDescription)", title: "Error")
                        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                    }
                    return nil;
            }
        }
        
    }
    
    override func configurationItems() -> [Any]! {
        if let channel = SLComposeSheetConfigurationItem() {
            channel.title = "Channel"
            channel.value = selectedChannel?.title
            channel.tapHandler = {
                let vc = ShareSelectViewController()
                vc.recentConnections = self.recentConnections
                vc.userChannels = self.userChannels
                vc.delegate = self
                self.pushConfigurationViewController(vc)
            }
            
            return [channel]
        }
        return nil
    }
    
    override func textViewDidChange(_ textView: UITextView) {
        super.textViewDidChange(textView)
        placeholderLabel.isHidden = !textView.text.isEmpty
    }
    
    private func setConfig() -> Any {
        guard let path = Bundle.main.path(forResource: "Info", ofType: "plist"),
            let dict = NSDictionary(contentsOfFile: path) else {
                return false
        }
        
        self.groupID = dict.value(forKey: "Group ID") as! String
        self.AWSBucket = dict.value(forKey: "AWS Bucket") as! String
        self.AWSPoolId = dict.value(forKey: "AWS Cognito Pool ID") as! String
        self.AWSTransferKey = dict.value(forKey: "AWS Transfer Key") as! String
        
        return true
    }
    
    private func setupUI() {
        let imageView = UIImageView(image: UIImage(named: "logo.png"))
        imageView.contentMode = .scaleAspectFit
        
        navigationItem.titleView = imageView
        navigationController?.navigationBar.topItem?.titleView = imageView
        navigationController?.navigationBar.tintColor = UIColor.black
        navigationController?.navigationBar.backgroundColor = UIColor.white
        navigationController?.view.backgroundColor = UIColor.white
        navigationController?.navigationBar.topItem?.rightBarButtonItem?.title = "Connect"
        
        placeholderLabel = UILabel()
        placeholderLabel.text = "Description"
        placeholderLabel.font = UIFont.italicSystemFont(ofSize: (textView.font?.pointSize)!)
        placeholderLabel.sizeToFit()
        textView.addSubview(placeholderLabel)
        placeholderLabel.frame.origin = CGPoint(x: 5, y: (textView.font?.pointSize)! / 2)
        placeholderLabel.textColor = UIColor.lightGray
        placeholderLabel.isHidden = !textView.text.isEmpty
    }
    
    private func getDefaults() {
        let userDefaults = UserDefaults(suiteName: self.groupID)
        
        if let authToken = userDefaults?.string(forKey: "authToken") {
            self.authToken = authToken
        }
        if let appToken = userDefaults?.string(forKey: "appToken") {
            self.appToken = appToken
        }
    }
    
    private func setupApollo() {
        let configuration = URLSessionConfiguration.default
        
        configuration.httpAdditionalHeaders = [
            "X-APP-TOKEN": self.appToken,
            "X-AUTH-TOKEN": self.authToken
        ]
        
        let url = URL(string: "https://api.are.na/graphql")!
        let transport = HTTPNetworkTransport(url: url, configuration: configuration)
        self.apollo = ApolloClient(networkTransport: transport)
    }
    
    private func fetchRecentConnections() {
        self.apollo?.fetch(query: RecentConnectionsQuery()) { (result, error) in
            if let error = error {
                self.showAlert(message: "Please log in through the Are.na app and try again.", title: "Access Denied")
                NSLog("Error fetching connections: \(error.localizedDescription)")
            }
            
            let recentConnections = result?.data?.me?.recentConnections
            recentConnections?.forEach {
                let channel = Channel()
                channel.id = $0?.id
                channel.title = $0?.title
                channel.visibility = $0?.visibility
                self.recentConnections.append(channel)
            }
            let allChannels = result?.data?.me?.contents
            allChannels?.forEach {
                let channel = Channel()
                channel.id = $0?.id
                channel.title = $0?.title
                channel.visibility = $0?.visibility
                self.userChannels.append(channel)
            }
            self.selectedChannel = self.recentConnections.first
            self.reloadConfigurationItems()
            self.validateContent()
        }
    }
    
    private func getShareContext() {
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
                // if the attachment is a url, clear the default text field.
                self.textView.text = ""
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
    
    private func showAlert(message: String, title: String) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: .default))
        self.present(alert, animated: true, completion: nil)
    }
}

extension ShareViewController: ShareSelectViewControllerDelegate {
    func selected(channel: Channel) {
        selectedChannel = channel
        reloadConfigurationItems()
        popConfigurationViewController()
    }
}
