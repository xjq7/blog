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
PUT /_index_/_mapping
{
  "properties": {
    "new_field": {
      "type": "new_value"
    }
  }
}
```
