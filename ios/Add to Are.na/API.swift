//  This file was automatically generated and should not be edited.

import Apollo

public final class CreateBlockMutationMutation: GraphQLMutation {
  public static let operationString =
    "mutation createBlockMutation($channel_ids: [ID]!, $title: String, $content: String, $description: String, $source_url: String) {\n  create_block(input: {channel_ids: $channel_ids, title: $title, content: $content, description: $description, source_url: $source_url}) {\n    __typename\n    clientMutationId\n  }\n}"

  public var channel_ids: [GraphQLID?]
  public var title: String?
  public var content: String?
  public var description: String?
  public var source_url: String?

  public init(channel_ids: [GraphQLID?], title: String? = nil, content: String? = nil, description: String? = nil, source_url: String? = nil) {
    self.channel_ids = channel_ids
    self.title = title
    self.content = content
    self.description = description
    self.source_url = source_url
  }

  public var variables: GraphQLMap? {
    return ["channel_ids": channel_ids, "title": title, "content": content, "description": description, "source_url": source_url]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("create_block", arguments: ["input": ["channel_ids": GraphQLVariable("channel_ids"), "title": GraphQLVariable("title"), "content": GraphQLVariable("content"), "description": GraphQLVariable("description"), "source_url": GraphQLVariable("source_url")]], type: .object(CreateBlock.selections)),
    ]

    public var snapshot: Snapshot

    public init(snapshot: Snapshot) {
      self.snapshot = snapshot
    }

    public init(createBlock: CreateBlock? = nil) {
      self.init(snapshot: ["__typename": "Mutation", "create_block": createBlock.flatMap { $0.snapshot }])
    }

    public var createBlock: CreateBlock? {
      get {
        return (snapshot["create_block"] as? Snapshot).flatMap { CreateBlock(snapshot: $0) }
      }
      set {
        snapshot.updateValue(newValue?.snapshot, forKey: "create_block")
      }
    }

    public struct CreateBlock: GraphQLSelectionSet {
      public static let possibleTypes = ["CreateBlockPayload"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("clientMutationId", type: .scalar(String.self)),
      ]

      public var snapshot: Snapshot

      public init(snapshot: Snapshot) {
        self.snapshot = snapshot
      }

      public init(clientMutationId: String? = nil) {
        self.init(snapshot: ["__typename": "CreateBlockPayload", "clientMutationId": clientMutationId])
      }

      public var __typename: String {
        get {
          return snapshot["__typename"]! as! String
        }
        set {
          snapshot.updateValue(newValue, forKey: "__typename")
        }
      }

      /// A unique identifier for the client performing the mutation.
      public var clientMutationId: String? {
        get {
          return snapshot["clientMutationId"] as? String
        }
        set {
          snapshot.updateValue(newValue, forKey: "clientMutationId")
        }
      }
    }
  }
}

public final class FetchPolicyQuery: GraphQLQuery {
  public static let operationString =
    "query FetchPolicy {\n  me {\n    __typename\n    policy {\n      __typename\n      AWSAccessKeyId\n      acl\n      bucket\n      expires\n      key\n      policy\n      signature\n      success_action_status\n    }\n  }\n}"

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
        GraphQLField("policy", type: .object(Policy.selections)),
      ]

      public var snapshot: Snapshot

      public init(snapshot: Snapshot) {
        self.snapshot = snapshot
      }

      public init(policy: Policy? = nil) {
        self.init(snapshot: ["__typename": "Me", "policy": policy.flatMap { $0.snapshot }])
      }

      public var __typename: String {
        get {
          return snapshot["__typename"]! as! String
        }
        set {
          snapshot.updateValue(newValue, forKey: "__typename")
        }
      }

      /// Manifest for uploading new files to S3
      public var policy: Policy? {
        get {
          return (snapshot["policy"] as? Snapshot).flatMap { Policy(snapshot: $0) }
        }
        set {
          snapshot.updateValue(newValue?.snapshot, forKey: "policy")
        }
      }

      public struct Policy: GraphQLSelectionSet {
        public static let possibleTypes = ["Policy"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("AWSAccessKeyId", type: .scalar(String.self)),
          GraphQLField("acl", type: .scalar(String.self)),
          GraphQLField("bucket", type: .scalar(String.self)),
          GraphQLField("expires", type: .scalar(String.self)),
          GraphQLField("key", type: .scalar(String.self)),
          GraphQLField("policy", type: .scalar(String.self)),
          GraphQLField("signature", type: .scalar(String.self)),
          GraphQLField("success_action_status", type: .scalar(String.self)),
        ]

        public var snapshot: Snapshot

        public init(snapshot: Snapshot) {
          self.snapshot = snapshot
        }

        public init(awsAccessKeyId: String? = nil, acl: String? = nil, bucket: String? = nil, expires: String? = nil, key: String? = nil, policy: String? = nil, signature: String? = nil, successActionStatus: String? = nil) {
          self.init(snapshot: ["__typename": "Policy", "AWSAccessKeyId": awsAccessKeyId, "acl": acl, "bucket": bucket, "expires": expires, "key": key, "policy": policy, "signature": signature, "success_action_status": successActionStatus])
        }

        public var __typename: String {
          get {
            return snapshot["__typename"]! as! String
          }
          set {
            snapshot.updateValue(newValue, forKey: "__typename")
          }
        }

        public var awsAccessKeyId: String? {
          get {
            return snapshot["AWSAccessKeyId"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "AWSAccessKeyId")
          }
        }

        public var acl: String? {
          get {
            return snapshot["acl"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "acl")
          }
        }

        public var bucket: String? {
          get {
            return snapshot["bucket"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "bucket")
          }
        }

        public var expires: String? {
          get {
            return snapshot["expires"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "expires")
          }
        }

        public var key: String? {
          get {
            return snapshot["key"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "key")
          }
        }

        public var policy: String? {
          get {
            return snapshot["policy"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "policy")
          }
        }

        public var signature: String? {
          get {
            return snapshot["signature"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "signature")
          }
        }

        public var successActionStatus: String? {
          get {
            return snapshot["success_action_status"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "success_action_status")
          }
        }
      }
    }
  }
}

public final class RecentConnectionsQuery: GraphQLQuery {
  public static let operationString =
    "query RecentConnections {\n  me {\n    __typename\n    recent_connections(per: 40) {\n      __typename\n      id\n      title\n      visibility\n    }\n  }\n}"

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
          GraphQLField("visibility", type: .scalar(String.self)),
        ]

        public var snapshot: Snapshot

        public init(snapshot: Snapshot) {
          self.snapshot = snapshot
        }

        public init(id: Int? = nil, title: String? = nil, visibility: String? = nil) {
          self.init(snapshot: ["__typename": "Channel", "id": id, "title": title, "visibility": visibility])
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

        public var visibility: String? {
          get {
            return snapshot["visibility"] as? String
          }
          set {
            snapshot.updateValue(newValue, forKey: "visibility")
          }
        }
      }
    }
  }
}