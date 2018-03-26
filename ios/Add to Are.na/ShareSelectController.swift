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
    
    enum TableSection: Int {
        case recent = 0, alpha
    }
    
    var recentConnections = [Channel]()
    var userChannels = [Channel]()
    var data = [TableSection: [Channel]]()
    
    
    weak var delegate: ShareSelectViewControllerDelegate?
    let SectionHeaderHeight: CGFloat = 25
    let RecentDivision: Int = 10
    
    override func viewDidLoad() {
        super.viewDidLoad()
        sortData()
        setupUI()
    }
    
    private func sortData() {
        data[.recent] = recentConnections
        data[.alpha] = userChannels.sorted(){$0.title.lowercased() < $1.title.lowercased()}
    }
    
    private func setupUI() {
        navigationController?.navigationBar.titleTextAttributes = [NSAttributedStringKey.foregroundColor: UIColor.black]
        title = "Select Channel"
        view.addSubview(tableView)
    }
}

extension ShareSelectViewController: UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if let tableSection = TableSection(rawValue: section), let channelData = data[tableSection] {
            print("ChannelData \(channelData)")
            return channelData.count
        }
        return 0
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return SectionHeaderHeight
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let view = UIView(frame: CGRect(x: 0, y: 0, width: tableView.bounds.width, height: SectionHeaderHeight))
        view.backgroundColor = UIColor(red: 250.0/255.0, green: 250.0/255.0, blue: 250.0/255.0, alpha: 1)
        let label = UILabel(frame: CGRect(x: 15, y: 0, width: tableView.bounds.width - 30, height: SectionHeaderHeight))
        label.font = UIFont.boldSystemFont(ofSize: 13)
        label.textColor = UIColor.black
        if let tableSection = TableSection(rawValue: section) {
            switch tableSection {
            case .recent:
                label.text = "Recent Connections"
            case .alpha:
                label.text = "All Channels"
            default:
                label.text = ""
            }
        }
        view.addSubview(label)
        return view
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: Identifiers.ChannelCell, for: indexPath)
        if let tableSection = TableSection(rawValue: indexPath.section), let channel = data[tableSection]?[indexPath.row] {
            cell.textLabel?.text = channel.title
            cell.textLabel?.font = UIFont.boldSystemFont(ofSize: 15)
            cell.textLabel?.textColor = getChannelColor(visibility: channel.visibility!)
            cell.backgroundColor = .clear
        }
        return cell
    }
}

extension ShareSelectViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let tableSection = TableSection(rawValue: indexPath.section)
        delegate?.selected(channel: (data[tableSection!]?[indexPath.row])!)
    }
}

private extension ShareSelectViewController {
    struct Identifiers {
        static let ChannelCell = "channelCell"
    }
}
