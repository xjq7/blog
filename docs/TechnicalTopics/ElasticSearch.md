[[toc]]

## 简介

Elasticsearch是一个开源的分布式搜索和分析引擎，具有以下核心优势：

1. 分布式架构：Elasticsearch采用分布式架构，可以轻松地在多台服务器上分布和扩展数据。这使得它具备高可用性和可伸缩性，并能够处理大规模的数据和负载
2. 实时搜索和分析：Elasticsearch提供了快速的实时搜索和分析能力。它使用倒排索引和分布式搜索算法来实现高效的搜索操作，可以在大规模的数据集上进行快速的文本搜索、过滤和聚合
3. 强大的全文搜索功能：Elasticsearch以全文搜索为核心，支持复杂的搜索查询和过滤条件。它提供了丰富的查询语法和灵活的过滤器，可以根据文档的内容、字段值和相关性进行全文搜索
4. 多种数据分析功能：除了搜索功能，Elasticsearch还提供了多种数据分析功能。它支持聚合、统计、分组和时序分析等操作，可以从大规模的数据集中提取有价值的见解
5. 可扩展的插件生态系统：Elasticsearch具有丰富的插件生态系统，可以通过插件扩展其功能。这些插件提供了额外的功能，例如数据可视化、安全性增强、监控和报告等
6. 灵活的数据模型：Elasticsearch采用面向文档的数据模型，可以存储和索引复杂的结构化和非结构化数据。它支持动态映射和自定义映射，可以根据需要灵活地定义数据模型
7. 高可用性和容错性：Elasticsearch通过数据复制和分片机制提供高可用性和容错性。它将数据分布到多个节点上，并自动处理节点故障和数据冗余，确保数据的可靠性和可用性
8. 开发和集成便捷性：Elasticsearch提供了简单易用的RESTful API和丰富的客户端库，支持多种编程语言。这使得开发人员可以轻松地与Elasticsearch进行交互，集成到各种应用和系统中

## DSL

### 查询

```SQL
GET [index]/_search

-- 匹配查询
GET [index]/_search
{
  "query": {
    "match": {
      "title": "标题1"
    }
  }
}

-- 范围查询
GET [index]/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 10,
        "lte": 50
      }
    }
  }
}

-- 布尔查询
GET [index]/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "title": "标题1" } },
        { "range": { "price": { "gte": 10 } } }
      ],
      "must_not": [
        { "term": { "age": 10 } }
      ],
      "should": [
        { "term": { "brand": "apple" } },
        { "term": { "brand": "vivo" } }
      ]
    }
  }
}

-- 嵌套查询
GET [index]/_search
{
  "query": {
    "nested": {
      "path": "nested_field",
      "query": {
        "match": {
          "nested_filed.field": "value"
        }
      }
    }
  }
}

-- 多字段匹配查询
GET [index]/_search
{
  "query": {
    "multi_match": {
      "query": "keyword",
      "fields": ["field1", "field2"]
    }
  }
}
```

### 新增字段

```SQL
PUT /[index]/_mapping
{
  "properties": {
    "new_field": {
      "type": "new_value"
    }
  }
}
```

### 删除数据

```SQL
POST /[index]/_delete_by_query
{
  "query":{
    "bool": {
      "should": [
        { "term": { "lcp": 0 } },
        { "term": { "fcp": 0 } }
      ]
    }
  }
}
```

### 获取结构

```SQL
GET [index]/_mapping
```

### 删除索引

```SQL
DELETE /[index]
```

### 创建索引

```SQL
PUT /[index]
{
  "mappings": {
    "properties": {
      "a": {
        "type": "keyword"
      },
      "b": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "c": {
        "type": "short"
      },
      "d": {
        "type": "date",
        "doc_values": true,
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "e": {
        "type": "nested",
        "properties": {
          "f": {
            "type": "short"
          },
          "g": {
            "type": "integer"
          },
          "h": {
            "type": "keyword"
          }
        }
      },
    }
  }
}
```

### 批量新增数据

```SQL
POST _bulk
{ "index" : { "_index" : "[index]", "_id" : "id1" } }
{ "id": "id1", "name": "xjq1" }
{ "index" : { "_index" : "[index]", "_id" : "id2" } }
{ "id": "id2", "name": "xjq2" }
```

## 字段修改

1. 新建索引

使用新的字段类型 新建索引

2. 重新索引数据

```SQL
POST _reindex
{
  "source": {
    "index": "[old-index]"
  },
  "dest": {
    "index": "[new-index]"
  }
}
```

3. 删除旧索引, 再重新索引数据回去
