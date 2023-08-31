## DSL

### 新增字段

```
PUT /_index_/_mapping
{
  "properties": {
    "new_field": {
      "type": "new_value"
    }
  }
}
```
