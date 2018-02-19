//
//  ShareTitleController.swift
//  Add to Are.na
//
//  Created by Charles Broskoski on 2/19/18.
//  Copyright © 2018 When It Changed, Inc. All rights reserved.
//

import UIKit

protocol ShareTitleViewControllerDelegate: class {
    func titleFinshedEditing(newValue: String)
}

class ShareTitleViewController: UIViewController {
    weak var delegate: ShareTitleViewControllerDelegate?
    var currentValue: String!
    
    private lazy var textView: UITextView = {
        let frame = CGRect(x: self.view.frame.minX, y: self.view.frame.minY, width: self.view.frame.width, height: self.view.frame.height)
        
        let tView = UITextView(frame: frame)
        tView.font = UIFont.systemFont(ofSize: 18)
        tView.textColor = UIColor.black
        tView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        return tView
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "Edit Title"
        textView.insertText(currentValue)
        view.addSubview(textView)
        
        textView.becomeFirstResponder()
        
        let doneButton = UIBarButtonItem(title: "Done", style: .done, target: nil, action: #selector(doneButtonClicked))
        
        navigationController?.navigationBar.titleTextAttributes = [NSAttributedStringKey.foregroundColor: UIColor.black]
        navigationItem.rightBarButtonItem = doneButton
    }
    
    @objc func doneButtonClicked() {
        let newValue = textView.text!
        delegate?.titleFinshedEditing(newValue: newValue)
    }
}
