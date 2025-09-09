window.BENCHMARK_DATA = {
  "lastUpdate": 1757450445448,
  "repoUrl": "https://github.com/eneca-dev/n8n-mcp",
  "entries": {
    "n8n-mcp Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "team@eneca.work",
            "name": "Eneca Team"
          },
          "committer": {
            "email": "team@eneca.work",
            "name": "Eneca Team"
          },
          "distinct": true,
          "id": "a4cd8d1381b7b6c7a7cfaa5b5355fdcede05eb48",
          "message": "Первоначальный коммит: n8n-mcp проект",
          "timestamp": "2025-09-09T23:36:00+03:00",
          "tree_id": "f60017ebb3d177f163a8712c0775d4cb4f1f6b4b",
          "url": "https://github.com/eneca-dev/n8n-mcp/commit/a4cd8d1381b7b6c7a7cfaa5b5355fdcede05eb48"
        },
        "date": 1757450445175,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0194,
            "range": "0.25760000000000005",
            "unit": "ms",
            "extra": "51553 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1826,
            "range": "1.0700000000000003",
            "unit": "ms",
            "extra": "314 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "range": "0.2475",
            "unit": "ms",
            "extra": "211778 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0667,
            "range": "0.3546",
            "unit": "ms",
            "extra": "14988 ops/sec"
          }
        ]
      }
    ]
  }
}