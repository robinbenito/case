//  This file was automatically generated and should not be edited.

import Apollo

public final class RecentConnectionsQuery: GraphQLQuery {
  public static let operationString =
    "query RecentConnections {\n  me {\n    __typename\n    recent_connections(per: 40) {\n      __typename\n      id\n      title\n    }\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("me", type: .object(Me.selections)),
    ]

    public var snapshot: Snapshot

    public init(snapshot: Snapshot) {
      self.snapshot = snapshot
    }

    public init(me: Me? = nil) {
      self.init(snapshot: ["__typename": "Query", "me": me.flatMap { $0.snapshot }])
    }

    /// The current logged in user
    public var me: Me? {
      get {
        return (snapshot["me"] as? Snapshot).flatMap { Me(snapshot: $0) }
      }
      set {
        snapshot.updateValue(newValue?.snapshot, forKey: "me")
      }
    }

    public struct Me: GraphQLSelectionSet {
      public static let possibleTypes = ["Me"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("recent_connections", arguments: ["per": 40], type: .list(.object(RecentConnection.selections))),
      ]

      public var snapshot: Snapshot

      public init(snapshot: Snapshot) {
        self.snapshot = snapshot
      }

      public init(recentConnections: [RecentConnection?]? = nil) {
        self.init(snapshot: ["__typename": "Me", "recent_connections": recentConnections.flatMap { $0.map { $0.flatMap { $0.snapshot } } }])
      }

      public var __typename: String {
        get {
          return snapshot["__typename"]! as! String
        }
        set {
          snapshot.updateValue(newValue, forKey: "__typename")
        }
      }

      public var recentConnections: [RecentConnection?]? {
        get {
          return (snapshot["recent_connections"] as? [Snapshot?]).flatMap { $0.map { $0.flatMap { RecentConnection(snapshot: $0) } } }
        }
        set {
          snapshot.updateValue(newValue.flatMap { $0.map { $0.flatMap { $0.snapshot } } }, forKey: "recent_connections")
        }
      }

      public struct RecentConnection: GraphQLSelectionSet {
        public static let possibleTypes = ["Channel"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .scalar(Int.self)),
          GraphQLField("title", type: .scalar(String.self)),
        ]

        public var snapshot: Snapshot

        public init(snapshot: Snapshot) {
          self.snapshot = snapshot
        }

        public init(id: Int? = nil, title: String? = nil) {
          self.init(snapshot: ["__typename": "Channel", "id": id, "title": title])
        }

        public var __typename: String {
          get {
            return snapshot["__typename"]! as! String
          }
          set {
            snapshot.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: Int? {
          get {
            return snapshot["id"] as? Int
          }
          set {
            snapshot.updateValue(newValue, forKey: "id")
          }
        }

        public var title: String? {
          get {
            return snapshot["title"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "title")
          }
        }
      }
    }
  }
}