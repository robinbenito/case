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

class ShareViewController: SLComposeServiceViewController {
    private var apollo: ApolloClient?
    private var authToken = String()
    private var appToken = String()
    private var userChannels = [Channel]()
    fileprivate var selectedChannel: Channel?
    
    // Make a rectangle
    func CGRectMake(_ x: CGFloat, _ y: CGFloat, _ width: CGFloat, _ height: CGFloat) -> CGRect {
        return CGRect(x: x, y: y, width: width, height: height)
    }
    
    // For setting the top bar
    func getTopWithColor(color: UIColor, size: CGSize) -> UIImage {
        let rect = CGRectMake(0, 0, size.width, size.height)
        UIGraphicsBeginImageContextWithOptions(size, false, 0)
        color.setFill()
        UIRectFill(rect)
        let image: UIImage = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext()
        return image
    }
    
    // Set the top bar styles
    func setupUI() {
        self.navigationController?.navigationBar.tintColor = UIColor.black
        let navSize = self.navigationController?.navigationBar.frame.size
        self.navigationController?.navigationBar.setBackgroundImage(getTopWithColor(color: UIColor.white, size: navSize!), for: .default)
        self.navigationController?.view.backgroundColor = UIColor.white
    }
    
    func getDefaults() {
        let userDefaults = UserDefaults(suiteName: "group.com.AddtoArena")
        
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
        
        configuration.httpAdditionalHeaders = ["X-APP-TOKEN": self.appToken]
        configuration.httpAdditionalHeaders = ["X-AUTH-TOKEN": self.authToken]
        
        let url = URL(string: "http://localhost:3000/graphql")!
        
        self.apollo = ApolloClient(networkTransport: HTTPNetworkTransport(url: url, configuration: configuration))
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
                self.userChannels.append(channel)
            }
            self.selectedChannel = self.userChannels.first
            self.reloadConfigurationItems()
        }
    }

    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return true
    }
    
    override func presentationAnimationDidFinish() {
        setupUI()
        getDefaults()
        setupApollo()
        fetchRecentConnections()
    }

    override func didSelectPost() {
        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
    
        // Inform the host that we're done, so it un-blocks its UI. Note: Alternatively you could call super's -didSelectPost, which will similarly complete the extension context.
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
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
