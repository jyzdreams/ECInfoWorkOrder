# 标书流程 - 可读版（基于业务逻辑理解）

## 阶段1: 标书录入与回标

```mermaid
flowchart TD
    A1[標書 主動尋找] --> B1[匯入系統 掃描標書<br/>By Tender Team]
    A2[標書 被動接收] --> B1
    B1 --> C1[系統自動分配<br/>相屬類別和區域]
    C1 --> D1[系統通知: 所屬主管]
    D1 --> E1[入系統 填寫報價表<br/>By Tender Team]
    E1 --> F1[入系統 匯出標書<br/>By Tender Team]
    E1 --> G1([系統自動更新記錄<br/>掃描標書/回標標書])
    F1 --> H1[回標<br/>By Tender Team]
    H1 --> G1
```

## 阶段2: 类别三叉（中标后执行段）

```mermaid
flowchart TD
    B1[匯入系統 掃描標書] --> M1
    B1 --> P1
    B1 --> MP1

    M1["M 保養<br/>By 1-8區組<br/>执行角色: CR"]
    P1["P 工程<br/>By Project 組<br/>执行角色: Project 主管"]
    MP1["M+P 保養+工程<br/>By ? 組<br/>执行角色: ? 主管"]

    M1 --> M2[系統通知:<br/>相屬主管 和 CR]
    P1 --> P2[系統通知:<br/>相屬主管]
    MP1 --> MP2[系統通知:<br/>相屬主管]
```

## 阶段3: 勘测 + 两条并行线路

```mermaid
flowchart TD
    subgraph M线 ["M线 (CR)"]
        MC1[聯絡客人預約現場勘測<br/>By CR] --> MC2[建立物料申請單 MR<br/>By CR]
        MC1 --> MC3[分派任務給師傅 PM排程<br/>By 主管/CR]
        MC2 --> MC4[查閱庫存<br/>By CR]
        MC3 --> ME1[師傅收到任務通知]
    end

    subgraph P线 ["P线 (Project 主管)"]
        PC1[聯絡客人預約現場勘測<br/>By Project 主管] --> PC2[建立物料申請單 MR<br/>By Project 主管]
        PC1 --> PC3[分派任務給師傅 PM排程<br/>By Project 主管]
        PC2 --> PC4[查閱庫存<br/>By Project 主管]
        PC3 --> PE1[師傅收到任務通知]
    end

    subgraph MP线 ["MP线 (? 主管)"]
        QC1[聯絡客人預約現場勘測<br/>By ? 主管] --> QC2[建立物料申請單 MR<br/>By ? 主管]
        QC1 --> QC3[分派任務給師傅 PM排程<br/>By ?]
        QC2 --> QC4[查閱庫存<br/>By ? 主管]
        QC3 --> QE1[師傅收到任務通知]
    end
```

> **关键**: 三条线在【聯絡客人預約現場勘測】后都有**两条并行线路**:
> 1. → 建立物料申請單MR → 查閱庫存（需要物料的备货路径）
> 2. → 分派任務給師傅PM排程 → 師傅收到任務通知（无需物料的直接执行路径）

## 阶段4: 备货流程（三条线同构，以M线为例）

```mermaid
flowchart TD
    MR[建立物料申請單 MR] --> ST[查閱庫存]
    ST --> SH{系統顯示}
    SH -->|有存貨| AP[申請貨品]
    SH -->|無存貨| NP[向採購部申請採購貨品]

    AP --> CF[確認貨品<br/>By 倉務部]
    CF -->|確認有存貨| KP[留貨<br/>By 倉務部]
    CF -->|確認無存貨| NS[系統顯示: 無存貨]
    NS -.回流.-> ST

    NP --> PO[發出PO 對外進行採購<br/>By 採購部]
    PO --> RC[收貨<br/>By 採購部]
    RC --> RCN[系統通知: 已收貨通知<br/>倉務部 + 角色主管]
    RCN --> IN[入庫<br/>By 倉務部]

    KP --> VQ[確認貨品資料數量<br/>By 角色主管]
    IN --> VQ
    VQ --> R{貨品核對}
    R -->|全部正確| PR[準備所有貨品 & 列印完工紙]
    R -->|部份/全部錯誤| ER[系統通知: 採購 倉務]
    ER -.回流.-> ST

    PR --> STB[貨品 & 完工紙合併放倉庫備用]
    STB --> AS[分派任務給師傅]
    AS --> TN[師傅收到任務通知]
```

## 阶段5: 现场执行（师傅侧，三条线共享）

```mermaid
flowchart TD
    TN[師傅收到任務通知] --> MY[我的任務/我的工單]
    TN --> TM[團隊任務/團隊工單]

    MY --> F1[地點/時間/聯絡人/工作內容]
    MY --> S1[狀態: 待確認]
    S1 --> RC1[收到]
    RC1 --> S2[狀態: 待處理]
    S2 --> LT[未能準時到達現場]
    S2 --> AR[準時到達現場: 簽到]
    LT --> TN1([系統通知: 超時通知])
    AR --> S3[狀態: 處理中]

    TM --> AP1[申請接單]
    AP1 --> AP2{需要審批}
    AP2 -->|通過| S2
    AP2 -->|不通過| NT1([系統通知: 角色主管])

    S3 --> CK[開始保養檢查]
    CK --> D1{能否即時處理?}
    D1 -->|可以即時處理| RP1[拍照 未維修]
    D1 -->|未能即時處理| SR1[填寫服務報告進行報價]

    RP1 --> FIX[進行維修]
    FIX --> RP2[拍照 已維修]
    RP2 --> SR2[填寫服務報告]
    SR2 --> CS1[客戶確認和簽名/蓋印]

    SR1 --> CS2[客戶簽名]
    CS2 --> SSR[掃描及提交服務報告]
    CS1 --> SSR

    SSR --> UPD([系統更新])
    SSR --> NT2[系統通知:<br/>報價部 採購部]
    SSR --> SUP[後補補價]
    SSR --> FIN([完成])

    FIN --> S4([狀態: 已完成])
    FIN --> NT3([系統通知:<br/>角色主管 會計部])

    NT2 --> RCV[收到服務報告和報價請求<br/>報價組]
    RCV --> FQE[填寫報價表<br/>報價部]
```

## 阶段6: 后补报价 + 财务闭环

```mermaid
flowchart TD
    SUP[後補補價] --> CSE[確認/編輯掃描資料正確<br/>語音輸入後補報價]
    CSE --> NT1[系統通知:<br/>報價部 角色主管]
    NT1 --> RCV[收到後補報價申請<br/>報價部]

    FQE[填寫報價表<br/>報價部] --> CK[查閱庫存數量和價錢<br/>報價部]
    CK --> SH{系統顯示}
    SH -->|有存貨 有參考價錢| CT[完成報價表]
    SH -->|無存貨 有參考價錢| CT
    SH -->|未知貨品 沒有參考價錢| AE[向採購部索取預估價]
    AE --> CT

    CT --> OT[發出報價表<br/>報價部]
    OT --> CC[客人回覆確認]

    RCV --> SEND[發出報價和完工紙<br/>給客戶]
    SEND --> CRC[客戶回覆確認]

    CC --> SEND2[發出報價和完工紙<br/>給客戶]
    SEND2 --> CRC

    CRC --> INV[報價組轉發給<br/>會計部開發票]
    INV --> PAY[收款]
    PAY --> END1([流程完結])
```

## 三条线的角色差异对照

| 节点 | M线 | P线 | MP线 |
|---|---|---|---|
| 类别 | M (保養) By 1-8區組 | P (工程) By Project組 | M+P By ?組 |
| 系统通知 | 相屬主管 **和 CR** | 相屬主管 | 相屬主管 |
| 勘测执行 | By CR | By Project 主管 | By ? 主管 |
| MR建立 | By CR | By Project 主管 | By ? 主管 |
| PM排程分派 | By 主管/CR | By Project 主管 | By ? |
| 查閱庫存 | By CR | By Project 主管 | By ? 主管 |
| 申請貨品 | By CR | By Project 主管 | By ? 主管 |
| 採購申請 | By CR | By Project 主管 | By ? 主管 |
| 確認貨品數量 | By CR | By Project 主管 | By ? 主管 |
| 準備貨品完工紙 | By CR | By Project 主管 | By ? 主管 |
| 分派師傅 | By 主管/CR | By Project 主管 | By ? 主管 |
| 團隊審批 | 需要CR/主管審批 | 需要Project主管審批 | 需要CR/主管審批 |
| 完成通知 | CR + 會計部 | Project主管 + 會計部 | ? + 會計部 |

> **结论**: 三条线的业务流程**完全同构**，唯一差异是执行角色（CR / Project 主管 / ? 主管）。
> M线的系统通知多了"和CR"，MP线的PM排程分派标注为"By ?"（无"主管"字样）。
