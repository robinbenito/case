//  This file was automatically generated and should not be edited.

import Apollo

public final class CreateBlockMutationMutation: GraphQLMutation {
  public let operationDefinition =
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

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(createBlock: CreateBlock? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "create_block": createBlock.flatMap { (value: CreateBlock) -> ResultMap in value.resultMap }])
    }

    public var createBlock: CreateBlock? {
      get {
        return (resultMap["create_block"] as? ResultMap).flatMap { CreateBlock(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "create_block")
      }
    }

    public struct CreateBlock: GraphQLSelectionSet {
      public static let possibleTypes = ["CreateBlockPayload"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("clientMutationId", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(clientMutationId: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "CreateBlockPayload", "clientMutationId": clientMutationId])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      /// A unique identifier for the client performing the mutation.
      public var clientMutationId: String? {
        get {
          return resultMap["clientMutationId"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "clientMutationId")
        }
      }
    }
  }
}

public final class RecentConnectionsQuery: GraphQLQuery {
  public let operationDefinition =
    "query RecentConnections {\n  me {\n    __typename\n    recent_connections(per: 10) {\n      __typename\n      id\n      title\n      visibility\n    }\n    contents(per: 300, type: CHANNEL) {\n      __typename\n      id\n      title\n      visibility\n    }\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("me", type: .object(Me.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(me: Me? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "me": me.flatMap { (value: Me) -> ResultMap in value.resultMap }])
    }

    /// The current logged in user
    public var me: Me? {
      get {
        return (resultMap["me"] as? ResultMap).flatMap { Me(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "me")
      }
    }

    public struct Me: GraphQLSelectionSet {
      public static let possibleTypes = ["Me"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("recent_connections", arguments: ["per": 10], type: .list(.object(RecentConnection.selections))),
        GraphQLField("contents", arguments: ["per": 300, "type": "CHANNEL"], type: .list(.object(Content.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(recentConnections: [RecentConnection?]? = nil, contents: [Content?]? = nil) {
        self.init(unsafeResultMap: ["__typename": "Me", "recent_connections": recentConnections.flatMap { (value: [RecentConnection?]) -> [ResultMap?] in value.map { (value: RecentConnection?) -> ResultMap? in value.flatMap { (value: RecentConnection) -> ResultMap in value.resultMap } } }, "contents": contents.flatMap { (value: [Content?]) -> [ResultMap?] in value.map { (value: Content?) -> ResultMap? in value.flatMap { (value: Content) -> ResultMap in value.resultMap } } }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var recentConnections: [RecentConnection?]? {
        get {
          return (resultMap["recent_connections"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [RecentConnection?] in value.map { (value: ResultMap?) -> RecentConnection? in value.flatMap { (value: ResultMap) -> RecentConnection in RecentConnection(unsafeResultMap: value) } } }
        }
        set {
          resultMap.updateValue(newValue.flatMap { (value: [RecentConnection?]) -> [ResultMap?] in value.map { (value: RecentConnection?) -> ResultMap? in value.flatMap { (value: RecentConnection) -> ResultMap in value.resultMap } } }, forKey: "recent_connections")
        }
      }

      public var contents: [Content?]? {
        get {
          return (resultMap["contents"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [Content?] in value.map { (value: ResultMap?) -> Content? in value.flatMap { (value: ResultMap) -> Content in Content(unsafeResultMap: value) } } }
        }
        set {
          resultMap.updateValue(newValue.flatMap { (value: [Content?]) -> [ResultMap?] in value.map { (value: Content?) -> ResultMap? in value.flatMap { (value: Content) -> ResultMap in value.resultMap } } }, forKey: "contents")
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

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: Int? = nil, title: String? = nil, visibility: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "Channel", "id": id, "title": title, "visibility": visibility])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: Int? {
          get {
            return resultMap["id"] as? Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var title: String? {
          get {
            return resultMap["title"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }

        public var visibility: String? {
          get {
            return resultMap["visibility"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "visibility")
          }
        }
      }

      public struct Content: GraphQLSelectionSet {
        public static let possibleTypes = ["Connectable"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .scalar(Int.self)),
          GraphQLField("title", type: .scalar(String.self)),
          GraphQLField("visibility", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: Int? = nil, title: String? = nil, visibility: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "Connectable", "id": id, "title": title, "visibility": visibility])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: Int? {
          get {
            return resultMap["id"] as? Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var title: String? {
          get {
            return resultMap["title"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }

        public var visibility: String? {
          get {
            return resultMap["visibility"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "visibility")
          }
        }
      }
    }
  }
}