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

func getChannelColor(visibility: String) -> UIColor {
    print("visibility from switch \(visibility)")
    switch visibility {
        case "closed":
            return UIColor(red: 75/255.0, green: 61/255.0, blue: 103/255.0, alpha: 1.0)
        case "private":
            return UIColor(red: 182/255.0, green: 2/255.0, blue: 2/255.0, alpha: 1.0)
        case "public":
            return UIColor(red: 23/255.0, green: 172/255.0, blue: 16/255.0, alpha: 1.0)
        default:
            return UIColor(red: 0/255.0, green: 0/255.0, blue: 0/255.0, alpha: 1.0)
    }
}

class ShareSelectViewController: UIViewController {
    private lazy var tableView: UITableView = {
        let tableView = UITableView(frame: self.view.frame)
        tableView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        tableView.dataSource = self
        tableView.delegate = self
        tableView.backgroundColor = .clear
        tableView.tintColor = UIColor.black
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
        navigationController?.navigationBar.titleTextAttributes = [NSAttributedStringKey.foregroundColor: UIColor.black]
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
        print("visibility \(userChannels[indexPath.row].visibility)")
        cell.textLabel?.textColor = getChannelColor(visibility: userChannels[indexPath.row].visibility!)
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
