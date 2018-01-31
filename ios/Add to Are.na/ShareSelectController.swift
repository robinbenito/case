//
//  ShareSelectController.swift
//  Add to Are.na
//
//  Created by Charles Broskoski on 1/31/18.
//  Copyright © 2018 When It Changed, Inc. All rights reserved.
//

import UIKit

protocol ShareSelectViewControllerDelegate: class {
    func selected(channel: Channel)
}

class ShareSelectViewController: UIViewController {
    private lazy var tableView: UITableView = {
        let tableView = UITableView(frame: self.view.frame)
        tableView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        tableView.dataSource = self
        tableView.delegate = self
        tableView.backgroundColor = .clear
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: Identifiers.ChannelCell)
        return tableView
    }()
    var userChannels = [Channel]()
    weak var delegate: ShareSelectViewControllerDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    private func setupUI() {
        navigationController?.navigationBar.titleTextAttributes = [NSAttributedStringKey.foregroundColor: UIColor.white]
        title = "Select Channel"
        view.addSubview(tableView)
    }
}

extension ShareSelectViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return userChannels.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: Identifiers.ChannelCell, for: indexPath)
        cell.textLabel?.text = userChannels[indexPath.row].title
        cell.backgroundColor = .clear
        return cell
    }
}

extension ShareSelectViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        delegate?.selected(channel: userChannels[indexPath.row])
    }
}

private extension ShareSelectViewController {
    struct Identifiers {
        static let ChannelCell = "channelCell"
    }
}
