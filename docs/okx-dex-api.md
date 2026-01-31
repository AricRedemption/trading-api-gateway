# OKX DEX API 文档

---

## 1. K 线数据

```
GET /okx-dex/candles
```

### 入参

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| chainId | string | ✓ | 链 ID（501=Solana, 1=Ethereum, 56=BSC） |
| address | string | ✓ | 代币合约地址 |
| bar | string | | K 线周期：`15s`, `1m`, `5m`, `15m`, `1H`, `4H`, `1D` |
| limit | number | | 返回数量 |
| after | number | | 游标时间戳（毫秒），获取此时间之前的数据 |

### 出参

```json
{
  "success": true,
  "data": {
    "code": "0",
    "data": [
      ["时间戳", "开盘价", "最高价", "最低价", "收盘价", "成交量", "成交额", "是否确认"]
    ]
  }
}
```

| 索引 | 说明 |
|:----:|------|
| [0] | 时间戳（毫秒） |
| [1] | 开盘价 (open) |
| [2] | 最高价 (high) |
| [3] | 最低价 (low) |
| [4] | 收盘价 (close) |
| [5] | 成交量（代币数量） |
| [6] | 成交额（计价货币） |
| [7] | 是否已确认：`0`=未完成, `1`=已完成 |

---

## 2. 买卖点标记

```
GET /okx-dex/bs-points
```

### 入参

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| chainId | string | ✓ | 链 ID |
| tokenAddress | string | ✓ | 代币合约地址 |
| fromAddressTags | string | ✓ | 地址标签（逗号分隔）：`kol-for-bs`, `dev`, `migrate-for-bs` |
| bar | string | | K 线周期 |

### 出参

```json
{
  "success": true,
  "data": {
    "code": 0,
    "data": [{
      "time": "1769834055000",
      "lastTime": "1769834065000",
      "fromAddress": "9Y9zGtq...",
      "fromAddressTag": "kol-for-bs",
      "buyAmount": "9236.71",
      "buyCount": "1",
      "buyPrice": "0.0138",
      "buyValue": "127.81",
      "sellAmount": "0",
      "sellCount": "0",
      "sellPrice": "0",
      "sellValue": "0",
      "bsExtInfo": { "kol": { "image": "...", "name": "..." } }
    }]
  }
}
```

| 字段 | 说明 |
|------|------|
| time | 所属 K 线时间戳 |
| fromAddress | 钱包地址 |
| fromAddressTag | 地址类型：`kol-for-bs`=KOL, `dev`=开发者 |
| buyAmount / sellAmount | 买入/卖出数量 |
| buyCount / sellCount | 买入/卖出笔数 |
| buyPrice / sellPrice | 买入/卖出均价 |
| buyValue / sellValue | 买入/卖出总价值 |

---

## 3. 情绪热度信息

```
GET /okx-dex/vibe-info
```

### 入参

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| chainIndex | string | ✓ | 链 ID |
| tokenContractAddress | string | ✓ | 代币合约地址 |
| timeRangeType | number | | 时间范围：`1`=24h, `2`=3d, `3`=7d, `4`=30d |

### 出参

```json
{
  "success": true,
  "data": {
    "code": 0,
    "data": {
      "tokenSymbol": "BP",
      "score": "61.38",
      "scoreChangeRate": "-9.62",
      "mentionsCount": "45",
      "mentionsCountChangeRate": "-70.2",
      "mentionedKolCount": "14",
      "impressions": "43167",
      "impressionsChangeRate": "-78.62",
      "engagement": "873",
      "engagementChangeRate": "-73.47",
      "liquidity": "812137.55",
      "chartInfo": [{
        "timestamp": "1769601600000",
        "price": "0.00231",
        "score": "57.17",
        "kolCount": "1",
        "kolInfoList": [{
          "kolHandleId": "MrKrabb_",
          "kolNickname": "MrKrabb",
          "kolAvatar": "https://...",
          "followers": "3971"
        }]
      }]
    }
  }
}
```

#### 顶层统计字段

| 字段 | 说明 |
|------|------|
| score | VIBE 热度评分（0-100） |
| scoreChangeRate | 评分变化率 (%) |
| mentionsCount | 被提及次数 |
| mentionedKolCount | 提及的 KOL 数量 |
| impressions | 曝光量 |
| engagement | 互动量（点赞、评论、转发） |
| liquidity | 流动性 (USD) |
| tokenSymbol | 代币符号 |

#### chartInfo 时间序列

| 字段 | 说明 |
|------|------|
| timestamp | 时间戳 |
| price | 价格 |
| score | 该时刻 VIBE 评分 |
| kolCount | KOL 提及数量 |
| kolInfoList | KOL 详情（昵称、头像、粉丝数） |

---

## 4. 交易历史/资金流向

```
GET /okx-dex/trading-history
```

### 入参

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| chainId | string | ✓ | 链 ID |
| tokenContractAddress | string | ✓ | 代币合约地址 |
| type | number | | 时间范围：`4`=5m, `1`=1h, `2`=4h, `3`=24h |

### 出参

```json
{
  "success": true,
  "data": {
    "code": 0,
    "data": {
      "buyAmountUsd": "4919083.94",
      "sellAmountUsd": "5034070.61",
      "inflow": "-114986.67",
      "totalAmountUsd": "9953154.55",
      "buyNo": "23724",
      "sellNo": "23224",
      "totalNo": "46948",
      "buyTraders": "4253",
      "sellTraders": "4989",
      "totalTraders": "6166"
    }
  }
}
```

| 字段 | 说明 |
|------|------|
| buyAmountUsd | 买入总额 (USD) |
| sellAmountUsd | 卖出总额 (USD) |
| inflow | 净流入 = 买入 - 卖出 |
| totalAmountUsd | 总成交额 (USD) |
| buyNo / sellNo | 买入/卖出笔数 |
| totalNo | 总交易笔数 |
| buyTraders / sellTraders | 买入/卖出人数 |
| totalTraders | 总交易人数 |

---

## 5. 代币概览

```
GET /okx-dex/token-overview
```

### 入参

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| chainId | string | ✓ | 链 ID |
| tokenContractAddress | string | ✓ | 代币合约地址 |

### 出参

```json
{
  "success": true,
  "data": {
    "code": 0,
    "data": {
      "basicInfo": {
        "tokenName": "Barking Puppy",
        "tokenSymbol": "BP",
        "tokenContractAddress": "3B1ijc...",
        "chainName": "Solana",
        "isMeme": "1"
      },
      "marketInfo": {
        "tokenCreateTime": "1768692871000",
        "tokenCreatorAddress": "AfxRML...",
        "marketCap": "9560096.12",
        "totalLiquidity": "834455.64",
        "holders": "7343",
        "circulatingSupply": "976522292.25",
        "priceChange5M": "1.53",
        "priceChange1H": "14.44",
        "priceChange4H": "-15.65",
        "priceChange24H": "44.95"
      },
      "memeInfo": {
        "createTime": "1768692872000",
        "creatorAddress": "AfxRML...",
        "transactions": "46977",
        "volume": "9951793.97"
      },
      "socialMedia": {
        "twitter": "https://x.com/BPuppy80020",
        "score": "61.29"
      }
    }
  }
}
```

#### 关键字段

| 字段 | 说明 |
|------|------|
| marketInfo.tokenCreateTime | 代币创建时间戳（毫秒）- **用于计算币龄** |
| marketInfo.tokenCreatorAddress | 创建者地址 |
| marketInfo.marketCap | 市值 (USD) |
| marketInfo.totalLiquidity | 总流动性 (USD) |
| marketInfo.holders | 持有人数 |
| marketInfo.priceChange* | 价格变化率 (5m/1h/4h/24h) |
| memeInfo.createTime | Meme 创建时间 |
| memeInfo.transactions | 总交易笔数 |
| memeInfo.volume | 总成交额 |
| socialMedia.score | 社交热度评分 |

---

## 错误码

| code | 说明 |
|------|------|
| 0 | 成功 |
| 100 | 参数错误 |
