//
//  ShareViewController.swift
//  Add to Are.na
//
//  Created by Charles Broskoski on 1/30/18.
//  Copyright © 2018 650 Industries, Inc. All rights reserved.
//

import UIKit
import Social

class ShareViewController: SLComposeServiceViewController {
    
    lazy var configurationItem: SLComposeSheetConfigurationItem = {
        let item = SLComposeSheetConfigurationItem()!
        item.title = "Channel"
        item.value = "Arena Influences"
        item.tapHandler = self.configurationItemTapped
        return item
    }()
    
    func configurationItemTapped() {
        print("config item tapped")
    }
    
    func CGRectMake(_ x: CGFloat, _ y: CGFloat, _ width: CGFloat, _ height: CGFloat) -> CGRect {
        return CGRect(x: x, y: y, width: width, height: height)
    }
    
    func getTopWithColor(color: UIColor, size: CGSize) -> UIImage {
        let rect = CGRectMake(0, 0, size.width, size.height)
        UIGraphicsBeginImageContextWithOptions(size, false, 0)
        color.setFill()
        UIRectFill(rect)
        let image: UIImage = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext()
        return image
    }

    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let userDefaults = UserDefaults(suiteName: "group.com.AddtoArena")
        userDefaults?.set("Hello", forKey: "key2")
        if let testUserId = userDefaults?.string(forKey: "key1") {
            print("User Id: \(testUserId)")
        }
        if let testString = userDefaults?.string(forKey: "key2") {
            print("String: \(testString)")
        }
        self.navigationController?.navigationBar.tintColor = UIColor.black
        let navSize = self.navigationController?.navigationBar.frame.size
        self.navigationController?.navigationBar.setBackgroundImage(getTopWithColor(color: UIColor.white, size: navSize!), for: .default)
    }

    override func didSelectPost() {
        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
    
        // Inform the host that we're done, so it un-blocks its UI. Note: Alternatively you could call super's -didSelectPost, which will similarly complete the extension context.
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    override func configurationItems() -> [Any]! {
        let configurationItems = [configurationItem]
        return configurationItems
    }

}
