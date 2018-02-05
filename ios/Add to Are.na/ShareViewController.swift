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

extension NSItemProvider {
    var isURL: Bool {
        return hasItemConformingToTypeIdentifier(kUTTypeURL as String)
    }
    var isText: Bool {
        return hasItemConformingToTypeIdentifier(kUTTypeText as String)
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
    
    // Make a rectangle
    func CGRectMake(_ x: CGFloat, _ y: CGFloat, _ width: CGFloat, _ height: CGFloat) -> CGRect {
        return CGRect(x: x, y: y, width: width, height: height)
    }
    
    // Set the top bar styles
    func setupUI() {
        let imageView = UIImageView(image: UIImage(named: "icon.png"))
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
        }
    }
    
    func getContext() {
        let extensionItem = extensionContext?.inputItems[0] as! NSExtensionItem
        let contentTypeURL = kUTTypeURL as String
        let contentTypeText = kUTTypeText as String
        
        for attachment in extensionItem.attachments as! [NSItemProvider] {
            if attachment.isURL {
                attachment.loadItem(forTypeIdentifier: contentTypeURL, options: nil, completionHandler: { (results, error) in
                    let url = results as! URL?
                    print("URL::: \(url!.absoluteString)")
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

    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return true
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
//        guard let text = textView.text else { return }
        apollo?.perform(mutation: CreateBlockMutationMutation(channel_ids: [GraphQLID(describing: selectedChannel.id!)], source_url: urlString)) { (result, error) in
            self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
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
