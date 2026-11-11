window.EC_QA_DATA={
  "metadata": {
    "schemaVersion": 1,
    "report": "outputs/2026-11-07-luna-qa/EC工單系統_新版逐頁面測試執行報告_20261107_Luna_BUG012-021批次修復回歸_20261109.xlsx",
    "baseline": "outputs/2026-11-06-new-ui-qa/EC工單系統_新版逐頁面測試基線_v1.1.xlsx",
    "reportSha256": "f57d45619c4889f324e18d50c8fb0e89896afda6abddf6aef1792121303f3414",
    "baselineSha256": "3cd48b5dabc04d19239d33ce4eaf8085a69bb30452b8c245218fc9e33ae1c56b",
    "reportDate": "2026-11-09",
    "prototypeVersion": "EC InfoTech 品牌版（2026-11-09 BUG-012–021 批次回歸）",
    "prototypeEvidence": "prototype/index.html",
    "prototypeEntry": "http://127.0.0.1:18863/",
    "scope": "34 個 Excel 測試分組；尚未全部核實為可達獨立頁面。此為逐頁 UI 測試紀錄，非業務整鏈驗收。",
    "coverageDefinition": "執行覆蓋率 = (PASS + FAIL) ÷ 全部用例；BLOCKED、待確認及未執行另列。",
    "sourceNotes": [
      [
        "頁面編號",
        "頁面名稱",
        "所屬模組",
        "測試用例數",
        "PASS",
        "FAIL",
        "BLOCKED",
        "待確認",
        "未执行",
        "頁面測試狀態"
      ],
      [
        "範圍說明",
        "目前工作區 prototype/；靜態入口清單；Computer Use 導航仍待驗證",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        "測試邊界",
        "僅UI／頁面功能交互；不改原型／配置／Hub／需求／客戶表；不執行倉庫通、發送、真實會計同步。",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        "頁面歸屬",
        "PC list/detail別名合併CALL管理；彈窗／抽屜及詳情面板歸所屬頁；SR及CP不同填報畫面分列；history已重定向tasks，不虛構歷史頁。",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        "規則身份",
        "依當前可見控件設計UI預期；未決業務在用例中明確標註；初始狀態一律未执行，不預填PASS。",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        "截圖連結",
        "實測後以 =HYPERLINK(\"screenshots/PAGE-001_頁面概覽.png\",\"頁面概覽\") 方式填入相對路徑；未取得真實截圖時不建立假連結。",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        "執行狀態",
        "第一階段基線；全部用例未执行。",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    ],
    "warnings": [
      "PAGE-003_TC-001：截圖缺失",
      "PAGE-003_TC-003：截圖缺失",
      "PAGE-003_TC-004：截圖缺失",
      "PAGE-003_TC-005：截圖缺失",
      "PAGE-003_TC-006：截圖缺失",
      "PAGE-003_TC-007：截圖缺失",
      "PAGE-003_TC-008：截圖缺失",
      "PAGE-003_TC-010：截圖缺失",
      "PAGE-003_TC-011：截圖缺失",
      "PAGE-003_TC-012：截圖缺失",
      "PAGE-003_TC-013：截圖缺失",
      "PAGE-003_TC-014：截圖缺失",
      "PAGE-004_TC-001：截圖缺失",
      "PAGE-004_TC-002：截圖缺失",
      "PAGE-004_TC-003：截圖缺失",
      "PAGE-004_TC-004：截圖缺失",
      "PAGE-004_TC-005：截圖缺失",
      "PAGE-004_TC-006：截圖缺失",
      "PAGE-004_TC-007：截圖缺失",
      "PAGE-004_TC-009：截圖缺失"
    ],
    "reviewBatch": {
      "label": "BUG-012–021（10項）",
      "state": "待審核",
      "issueIds": [
        "BUG-012",
        "BUG-013",
        "BUG-014",
        "BUG-015",
        "BUG-016",
        "BUG-017",
        "BUG-018",
        "BUG-019",
        "BUG-020",
        "BUG-021"
      ]
    }
  },
  "pages": [
    {
      "id": "PAGE-001",
      "name": "登入",
      "module": "公共",
      "sheet": "001_登入",
      "cases": [
        {
          "id": "PAGE-001_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 各角色 身份登入隔離靜態原型；經「開啟隔離靜態服務的 prototype/index.html」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-001_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "已從隔離 HTTP 入口載入品牌版登入頁；標題、公司標誌、角色選擇與登入操作可見，頁面可捲動至底部。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-001_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "001_登入",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-001_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-001_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 各角色 身份登入隔離靜態原型；經「開啟隔離靜態服務的 prototype/index.html」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-001_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-001_TC-002",
          "category": "登入",
          "item": "角色與人員選擇",
          "steps": "依次選 CS、CR、TL、MASTER、QUO、TENDER、PUR、FIN、ADMIN、BOSS；開啟人員選單並選一人登入，每次登出後再測下一角色。",
          "expected": "人員清單與角色一致；登入後顯示所選身份；登出回到登入畫面。",
          "actual": "依序選擇 CS、CR、TL、MASTER/師傅、QUO、TENDER、PUR、FIN、ADMIN、BOSS，各自選人登入並登出；登入後所示身份與選擇角色一致，登出回登入頁。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-001_TC-002_PASS_LOGIN_ROLE-ADMIN.png\",\"查看原圖\")",
          "sheet": "001_登入",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-001_TC-002_PASS_LOGIN_ROLE-ADMIN.png"
          ],
          "baseline": [
            "PAGE-001_TC-002",
            "登入",
            "角色與人員選擇",
            "依次選 CS、CR、TL、MASTER、QUO、TENDER、PUR、FIN、ADMIN、BOSS；開啟人員選單並選一人登入，每次登出後再測下一角色。",
            "人員清單與角色一致；登入後顯示所選身份；登出回到登入畫面。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-001_TC-003",
          "category": "必填校驗",
          "item": "未選人員登入",
          "steps": "在未選擇人員時嘗試登入；觀察提示，再選人員登入。",
          "expected": "未完成身份選擇時不以其他人身份進入；選擇完整後可進入。",
          "actual": "未選角色及人員時點登入，頁面提示「請輸入賬號」且未進入系統；選擇 CS 人員後可成功登入。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-001_TC-003_PASS_LOGIN.png\",\"查看原圖\")",
          "sheet": "001_登入",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-001_TC-003_PASS_LOGIN.png"
          ],
          "baseline": [
            "PAGE-001_TC-003",
            "必填校驗",
            "未選人員登入",
            "在未選擇人員時嘗試登入；觀察提示，再選人員登入。",
            "未完成身份選擇時不以其他人身份進入；選擇完整後可進入。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-001_TC-004",
          "category": "版面",
          "item": "窄屏登入捲動",
          "steps": "在窄屏視窗開啟登入，捲動到頁面底部並選擇師傅。",
          "expected": "身份選擇和登入按鈕均可觸及，無遮擋。",
          "actual": "390px 窄屏下可捲動至角色選擇及登入操作；選擇師傅後可進入首頁，未見遮擋登入按鈕。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-001_TC-004_PASS_NARROW.png\",\"查看原圖\")",
          "sheet": "001_登入",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-001_TC-004_PASS_NARROW.png"
          ],
          "baseline": [
            "PAGE-001_TC-004",
            "版面",
            "窄屏登入捲動",
            "在窄屏視窗開啟登入，捲動到頁面底部並選擇師傅。",
            "身份選擇和登入按鈕均可觸及，無遮擋。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-001_TC-005",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以各角色登入，進入登入；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "桌面與 390px 窄屏檢查登入頁；角色卡片標籤可讀，窄屏可垂直捲動，身份選擇及登入按鈕可觸及。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-001_TC-005_PASS_NARROW.png\",\"查看原圖\")",
          "sheet": "001_登入",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-001_TC-005_PASS_NARROW.png"
          ],
          "baseline": [
            "PAGE-001_TC-005",
            "品牌視覺",
            "品牌版版面與響應式",
            "以各角色登入，進入登入；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-001",
        "登入",
        "公共",
        5,
        "=COUNTIF('001_登入'!$G$2:$G$6,\"PASS\")",
        "=COUNTIF('001_登入'!$G$2:$G$6,\"FAIL\")",
        "=COUNTIF('001_登入'!$G$2:$G$6,\"BLOCKED\")",
        "=COUNTIF('001_登入'!$G$2:$G$6,\"待确认\")",
        "=COUNTIF('001_登入'!$G$2:$G$6,\"未执行\")",
        "=IF(F2>0,\"有失敗\",IF(G2>0,\"受阻\",IF(I2=D2,\"未执行\",IF(I2>0,\"部分執行\",IF(H2>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-002",
      "name": "PC首頁",
      "module": "工作台",
      "sheet": "002_PC首頁",
      "cases": [
        {
          "id": "PAGE-002_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 ADMIN／CS 身份登入隔離靜態原型；經「登入後點首頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-002_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以 ADMIN「林主管」登入；首頁標題及身份正確，指標、今日待辦、異常 CALL、最近動態及最近來電區塊載入，頁面可捲動。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-002_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "002_PC首頁",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-002_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 ADMIN／CS 身份登入隔離靜態原型；經「登入後點首頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-002_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-002_TC-002",
          "category": "資料呈現",
          "item": "指標與明細對應",
          "steps": "記下各指標數字；逐一點開有互動的指標卡，再關閉。",
          "expected": "卡片打開對應明細；標題及數量可與展示資料核對，不出現其他類別。",
          "actual": "首次執行（2026-11-07）：「待審批」計數為0，點擊卡片無反應，保留原始 FAIL 記錄。修改後回歸（2026-11-08，隔離本機原型，以 ADMIN 林主管登入）：點擊「待審批 0」後打開「待審批 CALL」彈窗，顯示「暫無對應 CALL」，確認沒有錯誤明細，回歸 PASS。",
          "result": "PASS",
          "bugId": "BUG-004",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-002_TC-002_PASS_APPROVAL_ZERO_20261108.png\",\"查看回歸圖\")",
          "sheet": "002_PC首頁",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-002_FAIL_APPROVAL_NO_ACTION.png"
          ],
          "baseline": [
            "PAGE-002_TC-002",
            "資料呈現",
            "指標與明細對應",
            "記下各指標數字；逐一點開有互動的指標卡，再關閉。",
            "卡片打開對應明細；標題及數量可與展示資料核對，不出現其他類別。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-002_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉待辦 CALL",
          "steps": "記下首筆編號與名稱；點擊待辦 CALL；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "點開首頁首筆待辦 WO-20260615-001（港島商業中心），抽屜編號及客戶相符；切換可見處理記錄，底部編輯操作可見；關閉後回首頁且待辦與列表入口仍可操作。報價分頁在該筆未顯示關聯報價內容。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-002_TC-003_PASS_DETAIL.png\",\"查看原圖\")",
          "sheet": "002_PC首頁",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-003_PASS_DETAIL.png"
          ],
          "baseline": [
            "PAGE-002_TC-003",
            "詳情抽屜",
            "開啟及關閉待辦 CALL",
            "記下首筆編號與名稱；點擊待辦 CALL；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-002_TC-004",
          "category": "導航",
          "item": "待辦與異常列表跳轉",
          "steps": "分別點今日待辦和異常CALL的「查看列表」，再返回首頁。",
          "expected": "進入 CALL 管理且可返回，列表與所選入口相符。",
          "actual": "分別點擊今日待辦及異常 CALL 的「查看列表」後均進入 CALL 管理，返回首頁可用；列表保持所有篩選為「全部」並顯示14筆，未沿用入口的待辦/異常條件。（測試日期：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-005",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-002_TC-004_FAIL_UNFILTERED_ABNORMAL.png\",\"查看原圖\")",
          "sheet": "002_PC首頁",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-004_FAIL_UNFILTERED_ABNORMAL.png"
          ],
          "baseline": [
            "PAGE-002_TC-004",
            "導航",
            "待辦與異常列表跳轉",
            "分別點今日待辦和異常CALL的「查看列表」，再返回首頁。",
            "進入 CALL 管理且可返回，列表與所選入口相符。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-002_TC-005",
          "category": "詳情抽屜",
          "item": "開啟及關閉來電記錄",
          "steps": "記下首筆編號與名稱；點擊來電記錄；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "首頁「最近來電」顯示「暫無來電記錄」，沒有可開啟的首筆來電及編號；未建立資料，避免改動測試數據。（測試日期：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-002_TC-005_BLOCKED_NO_RECENT_CALL.png\",\"查看原圖\")",
          "sheet": "002_PC首頁",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-005_BLOCKED_NO_RECENT_CALL.png"
          ],
          "baseline": [
            "PAGE-002_TC-005",
            "詳情抽屜",
            "開啟及關閉來電記錄",
            "記下首筆編號與名稱；點擊來電記錄；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-002_TC-006",
          "category": "通知",
          "item": "通知開關及目標",
          "steps": "開啟通知鈴鐺，選一條含編號通知，再返回並關閉通知。",
          "expected": "通知面板可開關；目標編號正確，已讀狀態可辨識。",
          "actual": "通知鈴鐺可開啟與關閉。通知面板顯示新增用戶 U015 馬師傅（2026-06-20 10:00），藍色圓點可辨識未讀狀態。點擊通知內容未導向其他畫面；面板已按鈴鐺關閉。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-002_TC-006_PASS_PANEL.png\",\"查看原圖\")",
          "sheet": "002_PC首頁",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-006_PASS_NOTIFICATIONS.png"
          ],
          "baseline": [
            "PAGE-002_TC-006",
            "通知",
            "通知開關及目標",
            "開啟通知鈴鐺，選一條含編號通知，再返回並關閉通知。",
            "通知面板可開關；目標編號正確，已讀狀態可辨識。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-002_TC-007",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以ADMIN／CS登入，進入PC首頁；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "桌面首頁文字可讀；在 390px 響應式視窗下，指標卡仍分成多欄，單卡寬度過窄，文字逐字換行，主要指標及標籤難以閱讀。（測試日期：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-006",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-002_TC-007_FAIL_NARROW.png\",\"查看原圖\")",
          "sheet": "002_PC首頁",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-007_FAIL_NARROW.png"
          ],
          "baseline": [
            "PAGE-002_TC-007",
            "品牌視覺",
            "品牌版版面與響應式",
            "以ADMIN／CS登入，進入PC首頁；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-002",
        "PC首頁",
        "工作台",
        7,
        "=COUNTIF('002_PC首頁'!$G$2:$G$8,\"PASS\")",
        "=COUNTIF('002_PC首頁'!$G$2:$G$8,\"FAIL\")",
        "=COUNTIF('002_PC首頁'!$G$2:$G$8,\"BLOCKED\")",
        "=COUNTIF('002_PC首頁'!$G$2:$G$8,\"待确认\")",
        "=COUNTIF('002_PC首頁'!$G$2:$G$8,\"未执行\")",
        "=IF(F3>0,\"有失敗\",IF(G3>0,\"受阻\",IF(I3=D3,\"未执行\",IF(I3>0,\"部分執行\",IF(H3>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-003",
      "name": "CALL管理",
      "module": "CALL",
      "sheet": "003_CALL管理",
      "cases": [
        {
          "id": "PAGE-003_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 CS／CR／TL 身份登入隔離靜態原型；經「側欄→CALL管理；list/detail 路由為同頁別名」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-003_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以 CS 陳小姐登入新版隔離原型並進入 CALL管理。標題、身份、PC／移動端切換、CALL視圖／客戶視圖、四項篩選及列表欄位可見；頁面底部可操作，顯示14條記錄及第2/2頁。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 2,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 CS／CR／TL 身份登入隔離靜態原型；經「側欄→CALL管理；list/detail 路由為同頁別名」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-003_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-002",
          "category": "搜尋篩選",
          "item": "CALL編號、客戶及狀態篩選與無結果恢復",
          "steps": "記下首筆資料；使用CALL編號、客戶及狀態篩選查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "重測（2026-11-08，管理員林主管，本機HTTP原型）：搜尋 WO-DEMO-FIN-MP-001 及「維多利亞酒店」各匹配1筆；輸入 QA-NO-MATCH-20261108 顯示「暫無匹配 CALL」；重置後清空關鍵詞並恢復14筆（每頁10筆、共2頁），回歸 PASS。",
          "result": "PASS",
          "bugId": "BUG-007",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-003_TC-002_PASS_SEARCH_20261108_RETEST.png\",\"查看重測圖\")",
          "sheet": "003_CALL管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-003_TC-002_PASS_SEARCH_20261108_RETEST.png"
          ],
          "baseline": [
            "PAGE-003_TC-002",
            "搜尋篩選",
            "CALL編號、客戶及狀態篩選與無結果恢復",
            "記下首筆資料；使用CALL編號、客戶及狀態篩選查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-003",
          "category": "列表",
          "item": "排序及分頁",
          "steps": "點編號／日期排序兩次；切換頁碼和每頁筆數；比較相鄰頁編號。",
          "expected": "排序方向可辨；分頁不重複漏顯；總數、當前頁一致。",
          "actual": "編號及創建時間表頭各連點兩次，可觀察排序方向切換；頁碼切換至第2頁並返回。將每頁筆數由10改為20後，列表顯示共16筆且為第1/1頁，未見頁碼重複或漏顯。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 4,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-003",
            "列表",
            "排序及分頁",
            "點編號／日期排序兩次；切換頁碼和每頁筆數；比較相鄰頁編號。",
            "排序方向可辨；分頁不重複漏顯；總數、當前頁一致。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-004",
          "category": "詳情抽屜",
          "item": "開啟及關閉CALL詳情",
          "steps": "記下首筆編號與名稱；點擊CALL詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "打開 CALL 詳情抽屜，核對來源行的 CALL 編號及客戶；切換基礎資料、處理記錄、報價分頁，關閉抽屜後列表恢復可操作。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 5,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-004",
            "詳情抽屜",
            "開啟及關閉CALL詳情",
            "記下首筆編號與名稱；點擊CALL詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-005",
          "category": "彈窗取消",
          "item": "新建CALL開啟與取消",
          "steps": "點擊「新建CALL」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "新建 CALL 表單輸入測試聯絡人後關閉；重新開啟表單時輸入值未保留，初始列表數量未增加，遮罩已關閉。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 6,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-005",
            "彈窗取消",
            "新建CALL開啟與取消",
            "點擊「新建CALL」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-006",
          "category": "必填校驗",
          "item": "新建CALL空白提交",
          "steps": "開啟新建CALL；清空標示必填欄位（客戶、聯絡人、電話、內容）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "空白提交被阻止並顯示「請在列表中選擇一項。」提示；未新增空白記錄。畫面首先定位至客戶欄，未逐欄分別展示其他缺項提示。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 7,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-006",
            "必填校驗",
            "新建CALL空白提交",
            "開啟新建CALL；清空標示必填欄位（客戶、聯絡人、電話、內容）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-007",
          "category": "儲存回看",
          "item": "新建CALL有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶、聯絡人、電話、內容及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "於隔離 Mock 新增測試 CALL；成功提示「工單已創建」，列表增加 WO-20261107-001。詳情顯示聯絡人 QA-Luna-20261107、電話 +852 55550123、M 類型、主管趙組長及測試描述。刷新時隔離服務曾短暫中斷；重啟服務並重新登入後該記錄仍在列表，完成刷新後回看。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 8,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-007",
            "儲存回看",
            "新建CALL有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶、聯絡人、電話、內容及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-008",
          "category": "彈窗取消",
          "item": "編輯CALL開啟與取消",
          "steps": "點擊「編輯CALL」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "對 WO-20261107-001 編輯聯絡人為 QA-Luna-CANCEL 後點取消；詳情仍顯示原值 QA-Luna-20261107，未提交變更。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 9,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-008",
            "彈窗取消",
            "編輯CALL開啟與取消",
            "點擊「編輯CALL」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-009",
          "category": "必填校驗",
          "item": "編輯CALL空白提交",
          "steps": "管理員林主管開啟 WO-20260615-003 編輯；確認客戶名稱、聯絡人、CALL 類型、主管及問題描述標必填；將聯絡人輸入純空格並保存；確認錯誤提示與無保存，取消後核對原資料。",
          "expected": "聯絡人輸入純空格時阻止保存並提示；取消後原資料不變。",
          "actual": "重測（2026-11-08，管理員林主管，本機 HTTP 原型）：編輯 CALL WO-20260615-003，表單顯示客戶名稱（唯讀）、聯絡人、CALL 類型、主管及問題描述的必填星號；聯絡人、類型、主管及描述控件帶 required。將聯絡人清空（原輸入純空格）後保存，系統提示「請填寫聯絡人」並阻止保存；取消後詳情仍保留原聯絡人及描述。電話、地址未標必填。回歸 PASS。",
          "result": "PASS",
          "bugId": "BUG-008",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-003_TC-009_PASS_REQUIRED_FIELDS_20261108_RETEST.png\",\"查看重測圖\")",
          "sheet": "003_CALL管理",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-003_TC-009_PASS_REQUIRED_FIELDS_20261108_RETEST.png"
          ],
          "baseline": [
            "PAGE-003_TC-009",
            "必填校驗",
            "編輯CALL空白提交",
            "開啟編輯CALL；清空標示必填欄位（客戶與內容）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-010",
          "category": "儲存回看",
          "item": "編輯CALL有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶與內容及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "將隔離測試記錄聯絡人改為 QA-Luna-EDITED、描述改為本用例更新值後保存；顯示「工單已更新」，詳情立即顯示兩個新值。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 11,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-010",
            "儲存回看",
            "編輯CALL有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶與內容及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-011",
          "category": "輸入邊界",
          "item": "特殊字元與長文字",
          "steps": "在搜尋及測試 CALL 描述輸入 \u003cQA>&「測試」 和 500 字文字，保存測試記錄後重開。",
          "expected": "以純文字呈現，不執行標籤；長內容可閱讀且不遮擋保存按鈕。",
          "actual": "將描述改為 \u003cQA>&「測試」及其後500字長文本後保存；詳情以純文字顯示完整特殊字元及長文本，未觸發標籤內容，抽屜保持可讀並可操作。（測試日期：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 12,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-011",
            "輸入邊界",
            "特殊字元與長文字",
            "在搜尋及測試 CALL 描述輸入 \u003cQA>&「測試」 和 500 字文字，保存測試記錄後重開。",
            "以純文字呈現，不執行標籤；長內容可閱讀且不遮擋保存按鈕。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-012",
          "category": "角色範圍",
          "item": "CR區域可見性",
          "steps": "分別以 CR 及 ADMIN 開啟 CALL管理，記錄可見區域與同一編號的操作。",
          "expected": "依所選身份顯示操作；若跨區範圍缺少批准依據，結果記待確認，不依程式反推批准。",
          "actual": "以 CR 陳關係（1區）與 ADMIN 林主管分別開啟列表，CR 可見7筆且含本次1區測試記錄；ADMIN 可見16筆（跨1區、2區、3區）。兩身份均可查看同一測試編號。尚無已確認的跨區資料可見規則，需業務確認。（測試日期：2026-11-07）",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 13,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-012",
            "角色範圍",
            "CR區域可見性",
            "分別以 CR 及 ADMIN 開啟 CALL管理，記錄可見區域與同一編號的操作。",
            "依所選身份顯示操作；若跨區範圍缺少批准依據，結果記待確認，不依程式反推批准。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-013",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以CS／CR／TL登入，進入CALL管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "桌面寬度下頁面標題、篩選、表格及分頁可讀；本輪 Computer Use 沒有可用的窄視窗／390px 裝置尺寸調整入口，未能完成窄屏實測。（測試日期：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "003_CALL管理",
          "row": 14,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-013",
            "品牌視覺",
            "品牌版版面與響應式",
            "以CS／CR／TL登入，進入CALL管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-014",
          "category": "歷史BUG回歸",
          "item": "BUG-001 回歸",
          "steps": "新建CALL描述只輸入空格，補齊其他必填後提交，查看是否產生記錄。",
          "expected": "必填描述不能只含空格；拒絕提交並提示。",
          "actual": "首次執行（2026-11-07）：僅輸入空格仍成功建立工單 WO-20261107-002，原始 FAIL 結果保留。 修改後回歸（2026-11-07，隔離本機原型）：再次輸入三個空格並提交；Call 描述欄下方顯示「請填寫 Call 描述。」且游標返回描述欄，列表記錄數未增加，回歸 PASS。",
          "result": "PASS",
          "bugId": "BUG-001",
          "screenshotCell": "原始 FAIL 截圖缺失；修改後回歸由 Computer Use 實際確認，未另存 PNG。",
          "sheet": "003_CALL管理",
          "row": 15,
          "screenshots": [],
          "baseline": [
            "PAGE-003_TC-014",
            "歷史BUG回歸",
            "BUG-001 回歸",
            "新建CALL描述只輸入空格，補齊其他必填後提交，查看是否產生記錄。",
            "必填描述不能只含空格；拒絕提交並提示。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-003_TC-015",
          "category": "歷史BUG回歸",
          "item": "BUG-003 回歸",
          "steps": "開啟新增CALL，查看描述欄名稱。",
          "expected": "欄位名稱清楚表示CALL內容／描述，與實際受理內容一致。",
          "actual": "重測（2026-11-08，管理員林主管，本機HTTP原型）：新增 CALL 表單區塊標題顯示「Call描述與附件」，必填欄位顯示「Call描述 *」；符合用例預期。未提交表單，回歸 PASS。",
          "result": "PASS",
          "bugId": "BUG-003",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-003_TC-015_PASS_LABEL_20261108_RETEST_SCROLL.png\",\"查看重測圖\")",
          "sheet": "003_CALL管理",
          "row": 16,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-003_TC-015_PASS_LABEL_20261108_RETEST_SCROLL.png"
          ],
          "baseline": [
            "PAGE-003_TC-015",
            "歷史BUG回歸",
            "BUG-003 回歸",
            "開啟新增CALL，查看描述欄名稱。",
            "欄位名稱清楚表示CALL內容／描述，與實際受理內容一致。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-003",
        "CALL管理",
        "CALL",
        15,
        13,
        0,
        "=COUNTIF('003_CALL管理'!$G$2:$G$16,\"BLOCKED\")",
        "=COUNTIF('003_CALL管理'!$G$2:$G$16,\"待确认\")",
        "=COUNTIF('003_CALL管理'!$G$2:$G$16,\"未执行\")",
        "=IF(F4>0,\"有失敗\",IF(G4>0,\"受阻\",IF(I4=D4,\"未执行\",IF(I4>0,\"部分執行\",IF(H4>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-004",
      "name": "新建工單來電記錄",
      "module": "CALL",
      "sheet": "004_新建工單來電記錄",
      "cases": [
        {
          "id": "PAGE-004_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 CS／BOSS 身份登入隔離靜態原型；經「首頁的新建入口→create（保留獨立表單入口）」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-004_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以陳小姐（CS）登入；首頁未見獨立新建入口，但由 CALL 管理 → 新增CALL 可開啟「新增Call」表單。表單標題、身份、欄位及上下滾動至附件／提交操作均可見；首頁是否應提供獨立入口待確認。",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "004_新建工單來電記錄",
          "row": 2,
          "screenshots": [],
          "baseline": [
            "PAGE-004_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 CS／BOSS 身份登入隔離靜態原型；經「首頁的新建入口→create（保留獨立表單入口）」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-004_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-004_TC-002",
          "category": "彈窗取消",
          "item": "提交工單開啟與取消",
          "steps": "點擊「提交工單」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。；舊版此獨立入口未找到，若新版仍不可達記錄阻塞，請勿強制呼叫內部函數。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "由 CALL 管理 → 新增CALL 開啟表單，選擇港島商業中心並輸入測試聯絡人、描述後點右上關閉；列表仍為 16 條。重新開啟表單，客戶、聯絡人及描述均已清空，沒有殘留遮罩。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "004_新建工單來電記錄",
          "row": 3,
          "screenshots": [],
          "baseline": [
            "PAGE-004_TC-002",
            "彈窗取消",
            "提交工單開啟與取消",
            "點擊「提交工單」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。；舊版此獨立入口未找到，若新版仍不可達記錄阻塞，請勿強制呼叫內部函數。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-004_TC-003",
          "category": "必填校驗",
          "item": "提交工單空白提交",
          "steps": "開啟提交工單；清空標示必填欄位（客戶類型、客戶、聯絡人、聯絡方式、區域、問題描述）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "空白表單點提交後顯示「請在列表中選擇一項。」並留在表單；未新增空白記錄（其後有效提交前列表仍為 16 條）。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "004_新建工單來電記錄",
          "row": 4,
          "screenshots": [],
          "baseline": [
            "PAGE-004_TC-003",
            "必填校驗",
            "提交工單空白提交",
            "開啟提交工單；清空標示必填欄位（客戶類型、客戶、聯絡人、聯絡方式、區域、問題描述）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-004_TC-004",
          "category": "儲存回看",
          "item": "提交工單有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶類型、客戶、聯絡人、聯絡方式、區域、問題描述及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "在隔離 Mock 選港島商業中心，填入 QA-Luna-PAGE004、電話 55550124 及描述後選「分派主管／趙組長」並提交。列表新增 WO-20261107-003；詳情中的客戶、聯絡人、電話、地址及描述與輸入相符。刷新頁面並重新登入後記錄仍在列表，確認本機資料保留。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "004_新建工單來電記錄",
          "row": 5,
          "screenshots": [],
          "baseline": [
            "PAGE-004_TC-004",
            "儲存回看",
            "提交工單有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶類型、客戶、聯絡人、聯絡方式、區域、問題描述及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-004_TC-005",
          "category": "欄位聯動",
          "item": "客戶類型與聯絡資料",
          "steps": "選政府客戶，再改私人並選另一客戶；檢查聯絡人、電話、TL及Call代碼。",
          "expected": "選項隨類型切換；切換客戶不保留前一客戶資料；條件必填可辨識。",
          "actual": "切換港島商業中心（私人）至香港政府大樓後，客戶類型由「私人」變為「政府」，聯絡人由陳先生變為何先生，地址及電話隨客戶更新；區域仍為 1區。政府客戶額外顯示必填 Call 代碼及 J No. 欄位。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "004_新建工單來電記錄",
          "row": 6,
          "screenshots": [],
          "baseline": [
            "PAGE-004_TC-005",
            "欄位聯動",
            "客戶類型與聯絡資料",
            "選政府客戶，再改私人並選另一客戶；檢查聯絡人、電話、TL及Call代碼。",
            "選項隨類型切換；切換客戶不保留前一客戶資料；條件必填可辨識。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-004_TC-006",
          "category": "來電判斷",
          "item": "僅答疑不建工單",
          "steps": "選僅答疑，填寫測試內容並提交；回 CALL 列表與首頁來電記錄查找。",
          "expected": "記錄來電但不產生需派工工單。",
          "actual": "表單處理方式只有「需要报价」「分派主管」「已解决」，沒有「僅答疑」選項；無法按本用例操作該分支，未提交資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "004_新建工單來電記錄",
          "row": 7,
          "screenshots": [],
          "baseline": [
            "PAGE-004_TC-006",
            "來電判斷",
            "僅答疑不建工單",
            "選僅答疑，填寫測試內容並提交；回 CALL 列表與首頁來電記錄查找。",
            "記錄來電但不產生需派工工單。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-004_TC-007",
          "category": "草稿",
          "item": "保存草稿與再次開啟",
          "steps": "填部分測試資料並點保存草稿；離開後由原入口再開。",
          "expected": "提示與實際恢復內容一致；若草稿恢復方式未定則記待確認。",
          "actual": "表單底部只有「提交」操作，未見「保存草稿」控制項；未提交資料。無法執行草稿保存及再次開啟檢查。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "004_新建工單來電記錄",
          "row": 8,
          "screenshots": [],
          "baseline": [
            "PAGE-004_TC-007",
            "草稿",
            "保存草稿與再次開啟",
            "填部分測試資料並點保存草稿；離開後由原入口再開。",
            "提示與實際恢復內容一致；若草稿恢復方式未定則記待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-004_TC-008",
          "category": "輸入校驗",
          "item": "切換客戶時同步地址地區",
          "steps": "CS 陳小姐登入 → CALL管理 → 新增CALL；選擇港島商業中心確認地址及地區，再切換九龍國際廣場，確認地址與地區同步更新；取消表單。",
          "expected": "選擇客戶時自動帶出其主要服務地址及對應地址地區；切換客戶時兩欄同步更新。無匹配地址時仍提示可直接輸入新地址。",
          "actual": "2026-11-08 本機 HTTP 原型回歸（CS 陳小姐）：選擇「港島商業中心」後，地址及地址地區更新為「中環德輔道中88號／港島」；切換「九龍國際廣場」後更新為「尖沙咀彌敦道123號／九龍」。上一輪輸入 QA-不存在地址時，已確認顯示「沒有匹配地址，可直接輸入新地址」。未提交表單，未建立記錄。回歸 PASS。",
          "result": "PASS",
          "bugId": "BUG-009",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-004_TC-008_PASS_CUSTOMER_REGION_SYNC_20261108_RETEST.png\",\"查看重測圖\")",
          "sheet": "004_新建工單來電記錄",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-004_TC-008_PASS_CUSTOMER_REGION_SYNC_20261108_RETEST.png"
          ],
          "baseline": [
            "PAGE-004_TC-008",
            "輸入校驗",
            "標準地點之外地址",
            "輸入不在標準地點選項中的 QA-不存在地址，補齊其餘欄位並提交。",
            "按畫面「只能選擇標準地點庫」提示阻止不合法地址或明確提示，不靜默存入。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-004_TC-009",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以CS／BOSS登入，進入新建工單來電記錄；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "已檢查桌面表單頂部欄位及底部附件、提交區；桌面版文字與操作可見。Computer Use 無可用窄屏視口控制，本輪無法按基線切換窄屏驗證。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "證據缺失：Computer Use 畫面已實際查看，但本輪無法將截圖輸出為 PNG。",
          "sheet": "004_新建工單來電記錄",
          "row": 10,
          "screenshots": [],
          "baseline": [
            "PAGE-004_TC-009",
            "品牌視覺",
            "品牌版版面與響應式",
            "以CS／BOSS登入，進入新建工單來電記錄；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-004",
        "新建工單來電記錄",
        "CALL",
        9,
        "=COUNTIF('004_新建工單來電記錄'!$G$2:$G$10,\"PASS\")",
        "=COUNTIF('004_新建工單來電記錄'!$G$2:$G$10,\"FAIL\")",
        "=COUNTIF('004_新建工單來電記錄'!$G$2:$G$10,\"BLOCKED\")",
        "=COUNTIF('004_新建工單來電記錄'!$G$2:$G$10,\"待确认\")",
        "=COUNTIF('004_新建工單來電記錄'!$G$2:$G$10,\"未执行\")",
        "=IF(F5>0,\"有失敗\",IF(G5>0,\"受阻\",IF(I5=D5,\"未执行\",IF(I5>0,\"部分執行\",IF(H5>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-005",
      "name": "分派中心",
      "module": "分派",
      "sheet": "005_分派中心",
      "cases": [
        {
          "id": "PAGE-005_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 TL／CR 身份登入隔離靜態原型；經「側欄→分派中心」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-005_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "TL 趙組長由側欄進入分派中心，標題、身份、狀態頁籤、篩選、列表及分頁器均顯示；頁面可捲至底部。另以 CR 陳關係進入確認可訪問。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-005_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 TL／CR 身份登入隔離靜態原型；經「側欄→分派中心」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-005_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-002",
          "category": "搜尋篩選",
          "item": "狀態、區域及師傅與無結果恢復",
          "steps": "記下首筆資料；使用狀態、區域及師傅查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "2026-11-08 本機 HTTP 原型回歸（TL 李組長）：在「待處理」頁籤連續輸入 QA-INPUT-20261108X，文字完整保留並顯示無匹配空態；等待結果更新後，焦點仍在輸入框，可繼續追加文字；按「重置」返回「全部」，條件清空並恢復 8 條記錄。先前已驗證「已分派＋1區＋趙師傅」命中 T-261107-005。回歸 PASS。",
          "result": "PASS",
          "bugId": "BUG-010",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-002_PASS_KEYWORD_INPUT_20261108_RETEST.png\",\"查看重測圖\")",
          "sheet": "005_分派中心",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-002_PASS_KEYWORD_INPUT_20261108_RETEST.png"
          ],
          "baseline": [
            "PAGE-005_TC-002",
            "搜尋篩選",
            "狀態、區域及師傅與無結果恢復",
            "記下首筆資料；使用狀態、區域及師傅查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉分派任務",
          "steps": "記下首筆編號與名稱；點擊分派任務；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "首筆任務 T-261107-001 詳情顯示相同客戶及合約編號；關閉詳情後分派列表仍可操作。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-005_TC-003",
            "詳情抽屜",
            "開啟及關閉分派任務",
            "記下首筆編號與名稱；點擊分派任務；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-004",
          "category": "彈窗取消",
          "item": "直接分派開啟與取消",
          "steps": "點擊「直接分派」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "直接分派彈窗可開啟；輸入測試字串後關閉，再開啟時欄位已清空，任務數未新增。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-005_TC-004",
            "彈窗取消",
            "直接分派開啟與取消",
            "點擊「直接分派」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-005",
          "category": "派工",
          "item": "師傅選擇、備註及回看",
          "steps": "重開隔離測試任務 T-261107-005；核對「已分派」及趙師傅，再檢查基礎資料與處理記錄中的派工備註。",
          "expected": "師傅及派工備註保存一致；列表狀態、詳情與提示相符。",
          "actual": "2026-11-08 本機 HTTP 原型回歸（TL 趙組長）：重開既有隔離測試任務 T-261107-005；詳情顯示「已分派」、趙師傅及派工備註「QA-20261107 電話約定時間 2026-11-08 10:00」；切換「處理記錄」可見由趙組長提交的同內容「派工備註」記錄。PASS。",
          "result": "PASS",
          "bugId": "BUG-011",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-005_PASS_NOTE_DETAIL_SCROLL_20261108.png\",\"查看任務詳情\")",
          "sheet": "005_分派中心",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-005_PASS_NOTE_DETAIL_SCROLL_20261108.png"
          ],
          "baseline": [
            "PAGE-005_TC-005",
            "派工",
            "師傅選擇、備註及回看",
            "選可派工本機樣例，開分派彈窗；選師傅並填 QA-20261106 電話約定時間；確認後重開同筆。",
            "師傅及派工備註保存一致；列表狀態、詳情與提示相符。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-006",
          "category": "必填校驗",
          "item": "未選師傅派工",
          "steps": "開待分派樣例，不選師傅直接確認。",
          "expected": "阻止派工並提示選擇師傅，不把空值寫入。",
          "actual": "未選師傅提交後，介面按提示允許建立 T-261107-006，並顯示在待處理列表；提示文字為「可先不選擇師傅，任務會進入待分派」。此行為與基線預期不同，但規則尚未確認，未判為 BUG。",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-006_PENDING.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-006_PENDING.png"
          ],
          "baseline": [
            "PAGE-005_TC-006",
            "必填校驗",
            "未選師傅派工",
            "開待分派樣例，不選師傅直接確認。",
            "阻止派工並提示選擇師傅，不把空值寫入。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-007",
          "category": "材料門檻",
          "item": "待備貨樣例操作",
          "steps": "開有材料且未備齊的既有樣例，觀察分派按鈕與提示；不操作任何倉庫同步。",
          "expected": "材料未備齊時顯示原因且不直接完成首次施工派工；備齊責任歸屬仍待確認。",
          "actual": "現有任務詳情沒有材料備貨狀態或未備齊樣例，無可檢查的材料門檻；未觸發任何倉庫操作。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-007_BLOCKED.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-007_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-005_TC-007",
            "材料門檻",
            "待備貨樣例操作",
            "開有材料且未備齊的既有樣例，觀察分派按鈕與提示；不操作任何倉庫同步。",
            "材料未備齊時顯示原因且不直接完成首次施工派工；備齊責任歸屬仍待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-008",
          "category": "彈窗取消",
          "item": "退回開啟與取消",
          "steps": "點擊「退回」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "當前任務處理選項沒有「退回」操作或退回彈窗，無法進行取消及回看驗證。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-008_BLOCKED.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-008_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-005_TC-008",
            "彈窗取消",
            "退回開啟與取消",
            "點擊「退回」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-009",
          "category": "彈窗取消",
          "item": "排程開啟與取消",
          "steps": "點擊「排程」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "保養排程視窗可開啟並顯示期數、間隔、首期時間、階段及師傅欄位；以關閉按鈕取消後回到原處理視窗，未提交變更。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-009_PASS.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-009_PASS.png"
          ],
          "baseline": [
            "PAGE-005_TC-009",
            "彈窗取消",
            "排程開啟與取消",
            "點擊「排程」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-010",
          "category": "欄位聯動",
          "item": "處理選項隨來源顯示",
          "steps": "分別開 CALL 來源及成交報價來源任務，切換可用處理選項並取消。",
          "expected": "來源、類別和可選處理項一致，不帶入前一任務選值。",
          "actual": "可見樣例只有自主分派來源，沒有成交報價來源任務；無法比較不同來源的處理方式聯動，未提交處理。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-010_BLOCKED.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 11,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-010_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-005_TC-010",
            "欄位聯動",
            "處理選項隨來源顯示",
            "分別開 CALL 來源及成交報價來源任務，切換可用處理選項並取消。",
            "來源、類別和可選處理項一致，不帶入前一任務選值。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-011",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以TL／CR登入，進入分派中心；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "TL 桌面頁及 CR 桌面／390px 響應式頁均可顯示；標題與主要控制可見，窄屏表格可橫向查看。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-011_PASS_CR_NARROW.png\",\"查看原圖\")",
          "sheet": "005_分派中心",
          "row": 12,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-011_PASS_CR_NARROW.png"
          ],
          "baseline": [
            "PAGE-005_TC-011",
            "品牌視覺",
            "品牌版版面與響應式",
            "以TL／CR登入，進入分派中心；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-005_TC-012",
          "category": "歷史BUG回歸",
          "item": "BUG-002 回歸",
          "steps": "開啟任務類型選項查看M、P、M+P名稱。",
          "expected": "M保養、P維修、M+P保養加維修；來源SOURCE-032 Q5。",
          "actual": "重測（2026-11-08，本機HTTP原型）：任務類型顯示「M（保養）」「P（工程）」「M+P（保養＋工程）」。項目使用者隨後澄清：「P就是工程，也可以说是维修，一个意思」；「M+P就是保养+工程」。因此此處「工程」與 SOURCE-032 Q5「维修」視為同一業務含義，符合預期，回歸 PASS；無需修改原型。",
          "result": "PASS",
          "bugId": "BUG-002",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-012_PASS_TERMINOLOGY_EQUIVALENT_20261108.png\",\"查看澄清後證據\")",
          "sheet": "005_分派中心",
          "row": 13,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-012_PASS_TERMINOLOGY_EQUIVALENT_20261108.png"
          ],
          "baseline": [
            "PAGE-005_TC-012",
            "歷史BUG回歸",
            "BUG-002 回歸",
            "開啟任務類型選項查看M、P、M+P名稱。",
            "M保養、P維修、M+P保養加維修；來源SOURCE-032 Q5。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-005",
        "分派中心",
        "分派",
        12,
        "=COUNTIF('005_分派中心'!$G$2:$G$13,\"PASS\")",
        "=COUNTIF('005_分派中心'!$G$2:$G$13,\"FAIL\")",
        "=COUNTIF('005_分派中心'!$G$2:$G$13,\"BLOCKED\")",
        "=COUNTIF('005_分派中心'!$G$2:$G$13,\"待确认\")",
        "=COUNTIF('005_分派中心'!$G$2:$G$13,\"未执行\")",
        "=IF(F6>0,\"有失敗\",IF(G6>0,\"受阻\",IF(I6=D6,\"未执行\",IF(I6>0,\"部分執行\",IF(H6>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-006",
      "name": "整期保養計劃",
      "module": "保養",
      "sheet": "006_整期保養計劃",
      "cases": [
        {
          "id": "PAGE-006_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 TL／CR／QUO 身份登入隔離靜態原型；經「側欄→保養計劃」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-006_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "TL 趙組長、CR 陳關係及 QUO 鄒組長均可經側欄進入保養計劃；標題、身份與頁面說明正常顯示，無載入錯誤。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-006_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "006_整期保養計劃",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-006_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-006_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 TL／CR／QUO 身份登入隔離靜態原型；經「側欄→保養計劃」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-006_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-006_TC-002",
          "category": "列表",
          "item": "計劃與期次資料",
          "steps": "有樣例時逐項核對計劃號、報價版本、合同日期、各期時間、師傅和狀態；無樣例時記錄空態。",
          "expected": "有資料顯示完整；無資料顯示尚無保養排程，不顯示錯誤表格。",
          "actual": "頁面明確顯示「尚無保養排程記錄」，沒有空資料時仍展示的錯誤表格。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-006_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "006_整期保養計劃",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-006_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-006_TC-002",
            "列表",
            "計劃與期次資料",
            "有樣例時逐項核對計劃號、報價版本、合同日期、各期時間、師傅和狀態；無樣例時記錄空態。",
            "有資料顯示完整；無資料顯示尚無保養排程，不顯示錯誤表格。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-006_TC-003",
          "category": "導航",
          "item": "查看關聯CALL",
          "steps": "對已有 CALL 的期次點「查看CALL」，核對編號並返回。",
          "expected": "進入同一編號 CALL；尚未建CALL的期次只顯示待排程。",
          "actual": "目前沒有任何保養期次資料或「查看 CALL」入口，無法核對關聯 CALL 編號及返回操作。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-006_TC-003_BLOCKED.png\",\"查看原圖\")",
          "sheet": "006_整期保養計劃",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-006_TC-003_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-006_TC-003",
            "導航",
            "查看關聯CALL",
            "對已有 CALL 的期次點「查看CALL」，核對編號並返回。",
            "進入同一編號 CALL；尚未建CALL的期次只顯示待排程。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-006_TC-004",
          "category": "待確認規則",
          "item": "逾期與首期規則",
          "steps": "只查看既有首期與逾期樣例，不修改日期，不執行生成。",
          "expected": "C-10首期月份及到期補做需客戶核實；記待確認，不據畫面判定業務通過。",
          "actual": "頁面沒有首期及逾期樣例可供檢視；C-10 首期月份和到期補做仍需客戶核實，未修改日期或生成資料。",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-006_TC-004_CONFIRMATION.png\",\"查看原圖\")",
          "sheet": "006_整期保養計劃",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-006_TC-004_CONFIRMATION.png"
          ],
          "baseline": [
            "PAGE-006_TC-004",
            "待確認規則",
            "逾期與首期規則",
            "只查看既有首期與逾期樣例，不修改日期，不執行生成。",
            "C-10首期月份及到期補做需客戶核實；記待確認，不據畫面判定業務通過。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-006_TC-005",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以TL／CR／QUO登入，進入整期保養計劃；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "TL／CR／QUO 均可訪問頁面；以 390px 響應式視口檢查，標題及空狀態說明可見，無資料表格及操作按鈕需要觸及。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-006_TC-005_PASS_NARROW.png\",\"查看原圖\")",
          "sheet": "006_整期保養計劃",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-006_TC-005_PASS_NARROW.png"
          ],
          "baseline": [
            "PAGE-006_TC-005",
            "品牌視覺",
            "品牌版版面與響應式",
            "以TL／CR／QUO登入，進入整期保養計劃；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-006",
        "整期保養計劃",
        "保養",
        5,
        "=COUNTIF('006_整期保養計劃'!$G$2:$G$6,\"PASS\")",
        "=COUNTIF('006_整期保養計劃'!$G$2:$G$6,\"FAIL\")",
        "=COUNTIF('006_整期保養計劃'!$G$2:$G$6,\"BLOCKED\")",
        "=COUNTIF('006_整期保養計劃'!$G$2:$G$6,\"待确认\")",
        "=COUNTIF('006_整期保養計劃'!$G$2:$G$6,\"未执行\")",
        "=IF(F7>0,\"有失敗\",IF(G7>0,\"受阻\",IF(I7=D7,\"未执行\",IF(I7>0,\"部分執行\",IF(H7>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-007",
      "name": "報價管理",
      "module": "報價",
      "sheet": "007_報價管理",
      "cases": [
        {
          "id": "PAGE-007_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 QUO／CR 身份登入隔離靜態原型；經「側欄→報價管理；詳情及新建／編輯抽屜歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-007_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "QUO 鄒組長登入後可從側欄進入報價管理；頁面標題、狀態、篩選區、列表及底部分頁可見，列表詳情可操作。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-001_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 QUO／CR 身份登入隔離靜態原型；經「側欄→報價管理；詳情及新建／編輯抽屜歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-007_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-002",
          "category": "搜尋篩選",
          "item": "編號、客戶、類別及狀態與無結果恢復",
          "steps": "記下首筆資料；使用編號、客戶、類別及狀態查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "以 QT-20260621-002 搜尋可找到九龍國際廣場報價；輸入 QA-NO-MATCH-20261109 顯示「暫無匹配報價」及 0 筆；重置後恢復 12 筆。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-012",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-002_PASS_20261109.png\",\"查看編號搜尋\")",
          "sheet": "007_報價管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-002_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-007_TC-002",
            "搜尋篩選",
            "編號、客戶、類別及狀態與無結果恢復",
            "記下首筆資料；使用編號、客戶、類別及狀態查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉報價詳情",
          "steps": "記下首筆編號與名稱；點擊報價詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "開啟首筆報價詳情後，報價編號及客戶與列表一致；詳情抽屜可關閉並返回列表。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-003_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-003",
            "詳情抽屜",
            "開啟及關閉報價詳情",
            "記下首筆編號與名稱；點擊報價詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-004",
          "category": "彈窗取消",
          "item": "新建報價開啟與取消",
          "steps": "點擊「新建報價」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "新建報價表單可開啟及取消；取消後回到列表，沒有新增記錄。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-004_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-004",
            "彈窗取消",
            "新建報價開啟與取消",
            "點擊「新建報價」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-005",
          "category": "必填校驗",
          "item": "新建報價空白提交",
          "steps": "開啟新建報價；清空標示必填欄位（客戶、類別、負責人、報價項目）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "提交空白新建報價表單時必填欄位顯示瀏覽器校驗，表單未保存。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-005_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-005",
            "必填校驗",
            "新建報價空白提交",
            "開啟新建報價；清空標示必填欄位（客戶、類別、負責人、報價項目）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-006",
          "category": "儲存回看",
          "item": "新建報價有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶、類別、負責人、報價項目及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "在隔離報價表單輸入數量 350、折扣 10% 後，小計顯示 315；保存後打開詳情確認數量、折扣及金額。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-006_PASS.png\",\"查看原圖（2張）\")",
          "sheet": "007_報價管理",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-006",
            "儲存回看",
            "新建報價有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶、類別、負責人、報價項目及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-007",
          "category": "彈窗取消",
          "item": "編輯報價開啟與取消",
          "steps": "點擊「編輯報價」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "打開現有報價編輯表單後修改內容並取消；重新查看原記錄，未保存取消前的修改。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-007_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-007_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-007",
            "彈窗取消",
            "編輯報價開啟與取消",
            "點擊「編輯報價」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-008",
          "category": "必填校驗",
          "item": "編輯報價空白提交",
          "steps": "開啟編輯報價；清空標示必填欄位（報價項目、數量、單價）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "空白料項名稱仍可提交價格變動並生成版本 002，未出現必填提示。為讓後續用例可繼續，已在隔離原型頁面補回料項，樣例隨後生成版本 003；這是本地 Mock 資料變更，沒有外部寫入。",
          "result": "FAIL",
          "bugId": "BUG-024",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-008_FAIL.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-008_FAIL.png"
          ],
          "baseline": [
            "PAGE-007_TC-008",
            "必填校驗",
            "編輯報價空白提交",
            "開啟編輯報價；清空標示必填欄位（報價項目、數量、單價）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-009",
          "category": "儲存回看",
          "item": "編輯報價有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊報價項目、數量、單價及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "編輯並保存隔離報價後，重開詳情可見標題及 OUR REF 002；版本歷史顯示 R0、R0、R1（當前），標籤均為有效數字。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-014",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-009_PASS_REVISION_HISTORY_20261109.png\",\"查看回歸截圖\")",
          "sheet": "007_報價管理",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-009_PASS_REVISION_HISTORY_20261109.png"
          ],
          "baseline": [
            "PAGE-007_TC-009",
            "儲存回看",
            "編輯報價有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊報價項目、數量、單價及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-010",
          "category": "計算校驗",
          "item": "明細計算與異常數值",
          "steps": "在未成交測試報價輸入總價350及折扣10%，核對顯示金額；再輸入負數並嘗試保存。",
          "expected": "按現行總價及折扣控件核對計算，負數不得靜默保存；逐行單價功能在現行新增表單未見。依據：舊執行報告PAGE-007及品牌版保留現有控件。",
          "actual": "報價金額計算可正常更新；輸入負數金額時瀏覽器數值約束阻止提交，頁面沒有保存該負數。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-010_PASS.png\",\"查看原圖（2張）\")",
          "sheet": "007_報價管理",
          "row": 11,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-010_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-010",
            "計算校驗",
            "明細計算與異常數值",
            "在未成交測試報價輸入總價350及折扣10%，核對顯示金額；再輸入負數並嘗試保存。",
            "按現行總價及折扣控件核對計算，負數不得靜默保存；逐行單價功能在現行新增表單未見。依據：舊執行報告PAGE-007及品牌版保留現有控件。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-011",
          "category": "修訂",
          "item": "歷史版本只讀",
          "steps": "開歷史記錄，記錄版本及金額，查看舊版後關閉再開目前版。",
          "expected": "舊版可辨識且不覆寫目前版本；目前資料未因查看歷史改變。",
          "actual": "報價版本記錄可查看且不提供直接改寫歷史版本的操作；測試報價歷史列表顯示 001、002 版本。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-011_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 12,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-011_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-011",
            "修訂",
            "歷史版本只讀",
            "開歷史記錄，記錄版本及金額，查看舊版後關閉再開目前版。",
            "舊版可辨識且不覆寫目前版本；目前資料未因查看歷史改變。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-012",
          "category": "彈窗取消",
          "item": "發送報價開啟與取消",
          "steps": "點擊「發送報價」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "點擊報價列的「報價」入口開啟編輯表單，未發現獨立寄送／發送確認視窗；取消表單，未對外發送報價。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-012_BLOCKED.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 13,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-012_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-007_TC-012",
            "彈窗取消",
            "發送報價開啟與取消",
            "點擊「發送報價」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-013",
          "category": "列印",
          "item": "報價預覽取消",
          "steps": "開列印預覽，檢查頁首、客戶、明細和頁尾；取消列印。",
          "expected": "預覽與所選報價一致；取消返回原頁，不實際發送。",
          "actual": "列印預覽成功開啟並呈現報價內容；關閉預覽返回，未執行實際列印。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-013_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 14,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-013_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-013",
            "列印",
            "報價預覽取消",
            "開列印預覽，檢查頁首、客戶、明細和頁尾；取消列印。",
            "預覽與所選報價一致；取消返回原頁，不實際發送。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-014",
          "category": "測試邊界",
          "item": "中單及倉庫重新同步",
          "steps": "只觀察已中單樣例與交付分頁；不點「確認中單」及「重新同步」。",
          "expected": "本輪不測真實宜搭／倉庫通寫入；需外部寫入的動作記BLOCKED（範圍限制）。",
          "actual": "只查看既有報價的交付區域；外部訂單／倉庫同步不在測試範圍，未操作同步或外部寫入。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-014_BLOCKED.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 15,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-014_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-007_TC-014",
            "測試邊界",
            "中單及倉庫重新同步",
            "只觀察已中單樣例與交付分頁；不點「確認中單」及「重新同步」。",
            "本輪不測真實宜搭／倉庫通寫入；需外部寫入的動作記BLOCKED（範圍限制）。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-007_TC-015",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以QUO／CR登入，進入報價管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "以 390px 響應式視口查看報價管理；頁面標題、主要篩選與報價資訊可見可讀，詳情面板可捲動。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-015_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "007_報價管理",
          "row": 16,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-015_PASS.png"
          ],
          "baseline": [
            "PAGE-007_TC-015",
            "品牌視覺",
            "品牌版版面與響應式",
            "以QUO／CR登入，進入報價管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-007",
        "報價管理",
        "報價",
        15,
        "=COUNTIF('007_報價管理'!$G$2:$G$16,\"PASS\")",
        "=COUNTIF('007_報價管理'!$G$2:$G$16,\"FAIL\")",
        "=COUNTIF('007_報價管理'!$G$2:$G$16,\"BLOCKED\")",
        "=COUNTIF('007_報價管理'!$G$2:$G$16,\"待确认\")",
        "=COUNTIF('007_報價管理'!$G$2:$G$16,\"未执行\")",
        "=IF(F8>0,\"有失敗\",IF(G8>0,\"受阻\",IF(I8=D8,\"未执行\",IF(I8>0,\"部分執行\",IF(H8>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-008",
      "name": "標書管理",
      "module": "標書",
      "sheet": "008_標書管理",
      "cases": [
        {
          "id": "PAGE-008_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 TENDER／BOSS 身份登入隔離靜態原型；經「側欄→標書管理；詳情及編輯彈窗歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-008_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "TENDER 郭標書登入後可由側欄進入標書管理；頁面標題、身份、狀態標籤、列表及頁面控制正常顯示。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-001_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 TENDER／BOSS 身份登入隔離靜態原型；經「側欄→標書管理；詳情及編輯彈窗歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-008_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-002",
          "category": "搜尋篩選",
          "item": "標書編號、項目名稱、客戶及區域與無結果恢復",
          "steps": "記下首筆資料；使用標書編號、項目名稱、客戶及區域查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "依標書編號、項目名稱、客戶及區域條件查找資料成功；輸入 QA-NO-MATCH 顯示空態，清除篩選後列表恢復。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-002_PASS.png\",\"查看原圖（2張）\")",
          "sheet": "008_標書管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-002",
            "搜尋篩選",
            "標書編號、項目名稱、客戶及區域與無結果恢復",
            "記下首筆資料；使用標書編號、項目名稱、客戶及區域查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-003",
          "category": "分頁",
          "item": "狀態分頁與計數",
          "steps": "逐一點待投標、已投標、已中標、未中標、已取消、不投標和全部；切換每頁筆數。",
          "expected": "選中標籤、資料狀態及筆數一致；無資料有空態。",
          "actual": "切換待投標、已投標、已中標、未中標、已取消、不投標及全部標籤時，選中狀態與列表及計數更新一致。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-003_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-003",
            "分頁",
            "狀態分頁與計數",
            "逐一點待投標、已投標、已中標、未中標、已取消、不投標和全部；切換每頁筆數。",
            "選中標籤、資料狀態及筆數一致；無資料有空態。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-004",
          "category": "詳情抽屜",
          "item": "開啟及關閉標書詳情",
          "steps": "記下首筆編號與名稱；點擊標書詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "開啟 T-2026-005 詳情後，編號及項目資料與所選列相符；關閉後可返回列表。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-004_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-004",
            "詳情抽屜",
            "開啟及關閉標書詳情",
            "記下首筆編號與名稱；點擊標書詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-005",
          "category": "彈窗取消",
          "item": "新建標書開啟與取消",
          "steps": "點擊「新建標書」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "新建標書表單成功開啟；檢查欄位後取消，未新增記錄。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-005_PASS.png\",\"查看原圖（2張）\")",
          "sheet": "008_標書管理",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-005",
            "彈窗取消",
            "新建標書開啟與取消",
            "點擊「新建標書」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-006",
          "category": "必填校驗",
          "item": "新建標書空白提交",
          "steps": "開啟新建標書；清空標示必填欄位（標書編號、項目名稱、客戶、截止日期）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "提交空白標書表單時，必填欄位顯示原生校驗提示，表單沒有保存。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-006_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-006",
            "必填校驗",
            "新建標書空白提交",
            "開啟新建標書；清空標示必填欄位（標書編號、項目名稱、客戶、截止日期）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-007",
          "category": "儲存回看",
          "item": "新建標書有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊標書編號、項目名稱、客戶、截止日期及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "在隔離 Mock 新增測試標書 T-2026-006，列表及詳情可查到測試項目 QA-20261107-PAGE008-TC007。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-007_PASS.png\",\"查看原圖（2張）\")",
          "sheet": "008_標書管理",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-007_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-007",
            "儲存回看",
            "新建標書有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊標書編號、項目名稱、客戶、截止日期及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-008",
          "category": "彈窗取消",
          "item": "編輯標書開啟與取消",
          "steps": "點擊「編輯標書」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "編輯測試標書後取消；返回詳情確認標題仍是保存前內容，取消沒有落盤。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-008_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-008_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-008",
            "彈窗取消",
            "編輯標書開啟與取消",
            "點擊「編輯標書」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-009",
          "category": "必填校驗",
          "item": "編輯標書空白提交",
          "steps": "開啟編輯標書；清空標示必填欄位（項目名稱、截止日期）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "編輯標書時清空金額並提交，必填校驗阻止保存；原始標書資料未被清空。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-009_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-009_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-009",
            "必填校驗",
            "編輯標書空白提交",
            "開啟編輯標書；清空標示必填欄位（項目名稱、截止日期）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-010",
          "category": "儲存回看",
          "item": "編輯標書有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊項目名稱、截止日期及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "編輯測試標書項目名稱並保存，詳情顯示新名稱；刷新頁面後重新以 TENDER 登入，列表仍顯示更新後資料。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-010_PASS.png\",\"查看原圖（2張）\")",
          "sheet": "008_標書管理",
          "row": 11,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-010_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-010",
            "儲存回看",
            "編輯標書有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊項目名稱、截止日期及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-011",
          "category": "彈窗取消",
          "item": "匯入標書開啟與取消",
          "steps": "點擊「匯入標書」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "導入標書彈窗可開啟及取消；未選擇文件、未執行導入。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-011_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 12,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-011_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-011",
            "彈窗取消",
            "匯入標書開啟與取消",
            "點擊「匯入標書」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-012",
          "category": "彈窗取消",
          "item": "更新狀態開啟與取消",
          "steps": "點擊「更新狀態」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "狀態更新彈窗可開啟及取消；未確認狀態更新，原有標書狀態保持不變。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-012_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 13,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-012_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-012",
            "彈窗取消",
            "更新狀態開啟與取消",
            "點擊「更新狀態」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-013",
          "category": "彈窗取消",
          "item": "排程開啟與取消",
          "steps": "點擊「排程」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "打開已中標 T-2026-002 詳情，可見「安排排程」並成功打開排程彈窗；點取消返回，沒有保存排程。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-015",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-013_PASS_20261109.png\",\"查看回歸截圖\")",
          "sheet": "008_標書管理",
          "row": 14,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-013_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-008_TC-013",
            "彈窗取消",
            "排程開啟與取消",
            "點擊「排程」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-014",
          "category": "附件",
          "item": "附件空態與預覽",
          "steps": "開有／無附件的既有標書，點可用預覽；關閉後回列表。",
          "expected": "有附件名稱與內容一致，無附件明確顯示未上傳，不顯示前筆附件。",
          "actual": "T-2026-001 詳情中的標書附件與其他相關文件均標示未上傳；無現成附件可預覽，未上傳測試檔。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-014_BLOCKED.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 15,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-014_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-008_TC-014",
            "附件",
            "附件空態與預覽",
            "開有／無附件的既有標書，點可用預覽；關閉後回列表。",
            "有附件名稱與內容一致，無附件明確顯示未上傳，不顯示前筆附件。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-008_TC-015",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以TENDER／BOSS登入，進入標書管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "以 390px 響應式視口查看標書管理，標題及篩選可見，主要控制可觸及；狀態標籤可橫向查看。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-015_PASS.png\",\"查看原圖（1張）\")",
          "sheet": "008_標書管理",
          "row": 16,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-015_PASS.png"
          ],
          "baseline": [
            "PAGE-008_TC-015",
            "品牌視覺",
            "品牌版版面與響應式",
            "以TENDER／BOSS登入，進入標書管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-008",
        "標書管理",
        "標書",
        15,
        "=COUNTIF('008_標書管理'!$G$2:$G$16,\"PASS\")",
        "=COUNTIF('008_標書管理'!$G$2:$G$16,\"FAIL\")",
        "=COUNTIF('008_標書管理'!$G$2:$G$16,\"BLOCKED\")",
        "=COUNTIF('008_標書管理'!$G$2:$G$16,\"待确认\")",
        "=COUNTIF('008_標書管理'!$G$2:$G$16,\"未执行\")",
        "=IF(F9>0,\"有失敗\",IF(G9>0,\"受阻\",IF(I9=D9,\"未执行\",IF(I9>0,\"部分執行\",IF(H9>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-009",
      "name": "備貨管理",
      "module": "備貨",
      "sheet": "009_備貨管理",
      "cases": [
        {
          "id": "PAGE-009_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 PUR／CR 身份登入隔離靜態原型；經「側欄→備貨管理；SP/PO抽屜歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-009_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "登入張採購後進入備貨管理；標題、待備貨／採購中／已到貨／本月採購額指標、列表欄位與三筆備貨資料可見。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "009_備貨管理",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-009_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 PUR／CR 身份登入隔離靜態原型；經「側欄→備貨管理；SP/PO抽屜歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-009_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-009_TC-002",
          "category": "指標",
          "item": "備貨指標明細",
          "steps": "逐一點待備貨、採購中、已到貨指標；核對對應列表狀態。",
          "expected": "類別、數量與列表可核對，空態清晰。",
          "actual": "待備貨 0、採購中 3、已到貨 0 與列表三筆狀態（待下單、已下單、已發貨）相符。點擊指標卡後列表未篩選，卡片呈統計展示。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "009_備貨管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-009_TC-002",
            "指標",
            "備貨指標明細",
            "逐一點待備貨、採購中、已到貨指標；核對對應列表狀態。",
            "類別、數量與列表可核對，空態清晰。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-009_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉備貨單",
          "steps": "記下首筆編號與名稱；點擊備貨單；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "開啟 SP-260620-0001 詳情後，備貨編號及客戶與列表一致；詳情包含兩張關聯採購單及物料資料；抽屜可捲動並可關閉返回列表。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "009_備貨管理",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-009_TC-003",
            "詳情抽屜",
            "開啟及關閉備貨單",
            "記下首筆編號與名稱；點擊備貨單；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-009_TC-004",
          "category": "詳情抽屜",
          "item": "開啟及關閉關聯採購單",
          "steps": "記下首筆編號與名稱；點擊關聯採購單；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "在 SP-260620-0001 點擊 PO-20260620-001，成功打開採購單獨立詳情並查看供應商、狀態、金額與物料。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-016",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-004_PASS_20261109.png\",\"查看回歸截圖\")",
          "sheet": "009_備貨管理",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-004_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-009_TC-004",
            "詳情抽屜",
            "開啟及關閉關聯採購單",
            "記下首筆編號與名稱；點擊關聯採購單；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-009_TC-005",
          "category": "關聯",
          "item": "報價和物料只讀核對",
          "steps": "開既有 SP，記下報價號和物料行；點關聯報價查看後返回。",
          "expected": "報價號、物料名稱、數量一致，不因只讀查看變更狀態。",
          "actual": "在備貨詳情點擊 QT-20260621-004，成功打開只讀報價詳情。此樣例沒有報價物料行，未能核對數量；入口與只讀查看已確認，原資料未改動。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-017",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-005_PASS_20261109.png\",\"查看回歸截圖\")",
          "sheet": "009_備貨管理",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-005_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-009_TC-005",
            "關聯",
            "報價和物料只讀核對",
            "開既有 SP，記下報價號和物料行；點關聯報價查看後返回。",
            "報價號、物料名稱、數量一致，不因只讀查看變更狀態。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-009_TC-006",
          "category": "待確認規則",
          "item": "備齊責任與放行",
          "steps": "查看備齊／入庫等可見操作與提示；不提交狀態、不連倉庫通。",
          "expected": "C-04備齊責任及放行未決；記待確認，不作已批准規則。",
          "actual": "檢視到狀態下拉選單以及「入庫存」「標記發貨」「編輯物料」操作；C-04 備齊責任及放行規則尚未確認，因此未提交任何狀態或倉庫操作。",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-006_CONFIRMATION.png\",\"查看原圖\")",
          "sheet": "009_備貨管理",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-006_CONFIRMATION.png"
          ],
          "baseline": [
            "PAGE-009_TC-006",
            "待確認規則",
            "備齊責任與放行",
            "查看備齊／入庫等可見操作與提示；不提交狀態、不連倉庫通。",
            "C-04備齊責任及放行未決；記待確認，不作已批准規則。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-009_TC-007",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以PUR／CR登入，進入備貨管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "使用採購部角色點擊移動端入口，頁面提示「目前角色沒有移動端工作台」；無法以該角色驗證窄屏工作台。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-007_BLOCKED.png\",\"查看原圖\")",
          "sheet": "009_備貨管理",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-007_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-009_TC-007",
            "品牌視覺",
            "品牌版版面與響應式",
            "以PUR／CR登入，進入備貨管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-009",
        "備貨管理",
        "備貨",
        7,
        "=COUNTIF('009_備貨管理'!$G$2:$G$8,\"PASS\")",
        "=COUNTIF('009_備貨管理'!$G$2:$G$8,\"FAIL\")",
        "=COUNTIF('009_備貨管理'!$G$2:$G$8,\"BLOCKED\")",
        "=COUNTIF('009_備貨管理'!$G$2:$G$8,\"待确认\")",
        "=COUNTIF('009_備貨管理'!$G$2:$G$8,\"未执行\")",
        "=IF(F10>0,\"有失敗\",IF(G10>0,\"受阻\",IF(I10=D10,\"未执行\",IF(I10>0,\"部分執行\",IF(H10>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-010",
      "name": "會計待開票",
      "module": "會計",
      "sheet": "010_會計待開票",
      "cases": [
        {
          "id": "PAGE-010_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 FIN 身份登入隔離靜態原型；經「會計管理→待開票」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-010_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "陳會計進入「待開票」後可見內容、篩選器及列表，共 30 條記錄；重新選取頁面仍正常顯示。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-018",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-010_TC-001_PASS_20261109.png\",\"查看回歸截圖\")",
          "sheet": "010_會計待開票",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-010_TC-001_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-010_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 FIN 身份登入隔離靜態原型；經「會計管理→待開票」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-010_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-010_TC-002",
          "category": "搜尋篩選",
          "item": "客戶、類型、日期及金額與無結果恢復",
          "steps": "記下首筆資料；使用客戶、類型、日期及金額查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "嘗試從會計管理入口查找待開票清單；主內容區為空，沒有客戶、類型、日期、金額篩選欄或列表，無法執行搜尋及空結果恢復。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-010_TC-002_BLOCKED.png\",\"查看原圖\")",
          "sheet": "010_會計待開票",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-010_TC-002_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-010_TC-002",
            "搜尋篩選",
            "客戶、類型、日期及金額與無結果恢復",
            "記下首筆資料；使用客戶、類型、日期及金額查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-010_TC-003",
          "category": "勾選",
          "item": "全選、取消及批次數量",
          "steps": "勾選一筆，再全選及取消全選；核對已選數字；切換篩選後再查看。",
          "expected": "已選數字與勾選一致；無選擇時不操作到未選記錄。",
          "actual": "會計管理主內容區為空，沒有記錄列或勾選框，無法檢查單筆勾選、全選及批次數量。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-010_TC-003_BLOCKED.png\",\"查看原圖\")",
          "sheet": "010_會計待開票",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-010_TC-003_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-010_TC-003",
            "勾選",
            "全選、取消及批次數量",
            "勾選一筆，再全選及取消全選；核對已選數字；切換篩選後再查看。",
            "已選數字與勾選一致；無選擇時不操作到未選記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-010_TC-004",
          "category": "彈窗取消",
          "item": "批量開具發票開啟與取消",
          "steps": "點擊「批量開具發票」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "主內容區沒有「批量開具發票」按鈕或列表，無法開啟並取消開票彈窗；沒有提交任何開票操作。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-010_TC-004_BLOCKED.png\",\"查看原圖\")",
          "sheet": "010_會計待開票",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-010_TC-004_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-010_TC-004",
            "彈窗取消",
            "批量開具發票開啟與取消",
            "點擊「批量開具發票」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-010_TC-005",
          "category": "開票回看",
          "item": "本機樣例開票",
          "steps": "只在隔離靜態原型選一筆測試記錄開票；切換發票管理查找來源；不連外部會計系統。",
          "expected": "生成一筆對應發票，待開票列表與發票列表一致；刷新不重複。",
          "actual": "主內容區沒有待開票記錄及開票入口；無法在本機 Mock 建立測試發票，未觸發外部會計系統。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-010_TC-005_BLOCKED.png\",\"查看原圖\")",
          "sheet": "010_會計待開票",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-010_TC-005_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-010_TC-005",
            "開票回看",
            "本機樣例開票",
            "只在隔離靜態原型選一筆測試記錄開票；切換發票管理查找來源；不連外部會計系統。",
            "生成一筆對應發票，待開票列表與發票列表一致；刷新不重複。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-010_TC-006",
          "category": "邊界",
          "item": "日期及金額反向區間",
          "steps": "輸入開始大於結束的日期及最小大於最大的金額後查詢。",
          "expected": "顯示校驗或空結果，不崩潰、不顯示無關資料。",
          "actual": "會計管理主內容區為空，沒有日期或金額欄位，無法輸入反向區間進行邊界校驗。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-010_TC-006_BLOCKED.png\",\"查看原圖\")",
          "sheet": "010_會計待開票",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-010_TC-006_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-010_TC-006",
            "邊界",
            "日期及金額反向區間",
            "輸入開始大於結束的日期及最小大於最大的金額後查詢。",
            "顯示校驗或空結果，不崩潰、不顯示無關資料。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-010_TC-007",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以FIN登入，進入會計待開票；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "會計管理主內容區為空；點擊移動端入口後亦沒有出現會計工作台內容，無法核對響應式版面。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-010_TC-007_BLOCKED.png\",\"查看原圖\")",
          "sheet": "010_會計待開票",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-010_TC-007_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-010_TC-007",
            "品牌視覺",
            "品牌版版面與響應式",
            "以FIN登入，進入會計待開票；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-010",
        "會計待開票",
        "會計",
        7,
        "=COUNTIF('010_會計待開票'!$G$2:$G$8,\"PASS\")",
        "=COUNTIF('010_會計待開票'!$G$2:$G$8,\"FAIL\")",
        "=COUNTIF('010_會計待開票'!$G$2:$G$8,\"BLOCKED\")",
        "=COUNTIF('010_會計待開票'!$G$2:$G$8,\"待确认\")",
        "=COUNTIF('010_會計待開票'!$G$2:$G$8,\"未执行\")",
        "=IF(F11>0,\"有失敗\",IF(G11>0,\"受阻\",IF(I11=D11,\"未执行\",IF(I11>0,\"部分執行\",IF(H11>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-011",
      "name": "發票管理",
      "module": "會計",
      "sheet": "011_發票管理",
      "cases": [
        {
          "id": "PAGE-011_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 FIN 身份登入隔離靜態原型；經「會計管理→發票管理」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-011_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以陳會計進入會計管理後主內容區空白；切換至同部門財務黃復核仍空白。可見導航只有首頁、會計管理、統計報表，沒有「發票管理」入口，無法進入目標頁。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-011_TC-001_BLOCKED.png\",\"查看原圖\")",
          "sheet": "011_發票管理",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-011_TC-001_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-011_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 FIN 身份登入隔離靜態原型；經「會計管理→發票管理」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-011_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-011_TC-002",
          "category": "搜尋篩選",
          "item": "發票編號與狀態與無結果恢復",
          "steps": "記下首筆資料；使用發票編號與狀態查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "會計管理主內容區空白且沒有發票管理入口；沒有發票列表、編號／狀態搜尋控件，無法搜尋已知發票或檢查無結果恢復。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-011_TC-002_BLOCKED.png\",\"查看原圖\")",
          "sheet": "011_發票管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-011_TC-002_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-011_TC-002",
            "搜尋篩選",
            "發票編號與狀態與無結果恢復",
            "記下首筆資料；使用發票編號與狀態查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-011_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉發票所關聯報告",
          "steps": "記下首筆編號與名稱；點擊發票所關聯報告；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "會計管理主內容區空白，沒有發票或關聯報告列表；無法開啟詳情抽屜或核對分頁。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-011_TC-003_BLOCKED.png\",\"查看原圖\")",
          "sheet": "011_發票管理",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-011_TC-003_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-011_TC-003",
            "詳情抽屜",
            "開啟及關閉發票所關聯報告",
            "記下首筆編號與名稱；點擊發票所關聯報告；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-011_TC-004",
          "category": "彈窗取消",
          "item": "更改數期開啟與取消",
          "steps": "點擊「更改數期」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "會計管理主內容區空白，沒有「更改數期」按鈕或發票列；無法開啟取消彈窗，未輸入或保存資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-011_TC-004_BLOCKED.png\",\"查看原圖\")",
          "sheet": "011_發票管理",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-011_TC-004_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-011_TC-004",
            "彈窗取消",
            "更改數期開啟與取消",
            "點擊「更改數期」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-011_TC-005",
          "category": "彈窗取消",
          "item": "更改金額開啟與取消",
          "steps": "點擊「更改金額」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "會計管理主內容區空白，沒有「更改金額」按鈕或發票列；無法開啟取消彈窗，未輸入或保存資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-011_TC-005_BLOCKED.png\",\"查看原圖\")",
          "sheet": "011_發票管理",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-011_TC-005_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-011_TC-005",
            "彈窗取消",
            "更改金額開啟與取消",
            "點擊「更改金額」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-011_TC-006",
          "category": "彈窗取消",
          "item": "更改日期開啟與取消",
          "steps": "點擊「更改日期」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "會計管理主內容區空白，沒有「更改日期」按鈕或發票列；無法開啟取消彈窗，未輸入或保存資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-011_TC-006_BLOCKED.png\",\"查看原圖\")",
          "sheet": "011_發票管理",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-011_TC-006_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-011_TC-006",
            "彈窗取消",
            "更改日期開啟與取消",
            "點擊「更改日期」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-011_TC-007",
          "category": "列印",
          "item": "發票預覽及重印取消",
          "steps": "選一張發票開列印及重印彈窗，核對客戶與金額後取消。",
          "expected": "預覽與來源一致；取消不改發票資料，不實際列印。",
          "actual": "會計管理主內容區空白，沒有發票、列印或重印入口；無法核對預覽，未觸發列印。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-011_TC-007_BLOCKED.png\",\"查看原圖\")",
          "sheet": "011_發票管理",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-011_TC-007_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-011_TC-007",
            "列印",
            "發票預覽及重印取消",
            "選一張發票開列印及重印彈窗，核對客戶與金額後取消。",
            "預覽與來源一致；取消不改發票資料，不實際列印。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-011_TC-008",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以FIN登入，進入發票管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "以會計部角色查看 PC／移動端切換，主內容區均空白且導航未提供發票管理入口；無法檢查發票頁面的欄位或響應式版面。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-011_TC-008_BLOCKED.png\",\"查看原圖\")",
          "sheet": "011_發票管理",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-011_TC-008_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-011_TC-008",
            "品牌視覺",
            "品牌版版面與響應式",
            "以FIN登入，進入發票管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-011",
        "發票管理",
        "會計",
        8,
        "=COUNTIF('011_發票管理'!$G$2:$G$9,\"PASS\")",
        "=COUNTIF('011_發票管理'!$G$2:$G$9,\"FAIL\")",
        "=COUNTIF('011_發票管理'!$G$2:$G$9,\"BLOCKED\")",
        "=COUNTIF('011_發票管理'!$G$2:$G$9,\"待确认\")",
        "=COUNTIF('011_發票管理'!$G$2:$G$9,\"未执行\")",
        "=IF(F12>0,\"有失敗\",IF(G12>0,\"受阻\",IF(I12=D12,\"未执行\",IF(I12>0,\"部分執行\",IF(H12>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-012",
      "name": "收款記錄",
      "module": "會計",
      "sheet": "012_收款記錄",
      "cases": [
        {
          "id": "PAGE-012_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 FIN 身份登入隔離靜態原型；經「會計管理→收款記錄」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-012_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以會計部角色進入會計管理後主內容區空白；導航只有首頁、會計管理、統計報表，沒有「收款記錄」入口，無法進入目標頁。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-012_TC-001_BLOCKED.png\",\"查看原圖\")",
          "sheet": "012_收款記錄",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-012_TC-001_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-012_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 FIN 身份登入隔離靜態原型；經「會計管理→收款記錄」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-012_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-012_TC-002",
          "category": "搜尋篩選",
          "item": "收款記錄可見搜尋欄位與無結果恢復",
          "steps": "記下首筆資料；使用收款記錄可見搜尋欄位查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "會計管理主內容區空白且沒有收款記錄入口；沒有收款列表及搜尋控件，無法查找記錄或檢查無結果恢復。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-012_TC-002_BLOCKED.png\",\"查看原圖\")",
          "sheet": "012_收款記錄",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-012_TC-002_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-012_TC-002",
            "搜尋篩選",
            "收款記錄可見搜尋欄位與無結果恢復",
            "記下首筆資料；使用收款記錄可見搜尋欄位查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-012_TC-003",
          "category": "資料",
          "item": "收款與發票對應",
          "steps": "選一筆既有收款，核對客戶、發票編號、金額、日期與方式。",
          "expected": "同一記錄各欄位完整，金額格式可辨，不混入其他客戶資料。",
          "actual": "會計管理主內容區空白，沒有既有收款或發票資料列；無法核對客戶、發票編號、金額、日期及方式。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-012_TC-003_BLOCKED.png\",\"查看原圖\")",
          "sheet": "012_收款記錄",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-012_TC-003_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-012_TC-003",
            "資料",
            "收款與發票對應",
            "選一筆既有收款，核對客戶、發票編號、金額、日期與方式。",
            "同一記錄各欄位完整，金額格式可辨，不混入其他客戶資料。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-012_TC-004",
          "category": "列印",
          "item": "收據預覽取消",
          "steps": "點既有收款的列印收據，核對付款人及金額後取消。",
          "expected": "預覽指向所選收款，取消可返回列表。",
          "actual": "會計管理主內容區空白，沒有既有收款列或「列印收據」入口；無法開啟預覽，未觸發列印。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-012_TC-004_BLOCKED.png\",\"查看原圖\")",
          "sheet": "012_收款記錄",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-012_TC-004_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-012_TC-004",
            "列印",
            "收據預覽取消",
            "點既有收款的列印收據，核對付款人及金額後取消。",
            "預覽指向所選收款，取消可返回列表。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-012_TC-005",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以FIN登入，進入收款記錄；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "嘗試 PC／移動端切換後會計管理主內容區仍空白；導航沒有收款記錄入口，無法檢查收款頁欄位或響應式版面。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-012_TC-005_BLOCKED.png\",\"查看原圖\")",
          "sheet": "012_收款記錄",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-012_TC-005_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-012_TC-005",
            "品牌視覺",
            "品牌版版面與響應式",
            "以FIN登入，進入收款記錄；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-012",
        "收款記錄",
        "會計",
        5,
        "=COUNTIF('012_收款記錄'!$G$2:$G$6,\"PASS\")",
        "=COUNTIF('012_收款記錄'!$G$2:$G$6,\"FAIL\")",
        "=COUNTIF('012_收款記錄'!$G$2:$G$6,\"BLOCKED\")",
        "=COUNTIF('012_收款記錄'!$G$2:$G$6,\"待确认\")",
        "=COUNTIF('012_收款記錄'!$G$2:$G$6,\"未执行\")",
        "=IF(F13>0,\"有失敗\",IF(G13>0,\"受阻\",IF(I13=D13,\"未执行\",IF(I13>0,\"部分執行\",IF(H13>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-013",
      "name": "會計客戶檔案",
      "module": "會計",
      "sheet": "013_會計客戶檔案",
      "cases": [
        {
          "id": "PAGE-013_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 FIN 身份登入隔離靜態原型；經「會計管理→客戶檔案」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-013_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以財務黃登入後選擇「會計管理」，頁面標題顯示會計管理，但主內容區空白；導航僅有首頁、會計管理、統計報表，無「客戶檔案」入口，無法到達測試頁。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-001_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-001_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 FIN 身份登入隔離靜態原型；經「會計管理→客戶檔案」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-013_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-013_TC-002",
          "category": "搜尋篩選",
          "item": "客戶檔案可見篩選欄位與無結果恢復",
          "steps": "記下首筆資料；使用客戶檔案可見篩選欄位查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "目標客戶檔案頁面不可達，沒有客戶列表、搜尋或篩選欄位可操作，無法查找資料或驗證無結果後恢復。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-002_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-002_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-002",
            "搜尋篩選",
            "客戶檔案可見篩選欄位與無結果恢復",
            "記下首筆資料；使用客戶檔案可見篩選欄位查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-013_TC-003",
          "category": "彈窗取消",
          "item": "新增客戶檔案開啟與取消",
          "steps": "點擊「新增客戶檔案」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "目標頁面不可達，沒有「新增客戶檔案」按鈕或對話框入口；未輸入或保存資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-003_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-003_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-003",
            "彈窗取消",
            "新增客戶檔案開啟與取消",
            "點擊「新增客戶檔案」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-013_TC-004",
          "category": "必填校驗",
          "item": "新增客戶檔案空白提交",
          "steps": "開啟新增客戶檔案；清空標示必填欄位（客戶名稱、帳戶及畫面標記必填欄位）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "目標頁面不可達，沒有新增表單或必填欄位可清空／提交；未觸發保存。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-004_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-004_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-004",
            "必填校驗",
            "新增客戶檔案空白提交",
            "開啟新增客戶檔案；清空標示必填欄位（客戶名稱、帳戶及畫面標記必填欄位）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-013_TC-005",
          "category": "儲存回看",
          "item": "新增客戶檔案有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶名稱、帳戶及畫面標記必填欄位及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "目標頁面不可達，沒有客戶檔案表單可填寫；未新增記錄，未觸發外部服務或系統寫入。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-005_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-005_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-005",
            "儲存回看",
            "新增客戶檔案有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶名稱、帳戶及畫面標記必填欄位及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-013_TC-006",
          "category": "彈窗取消",
          "item": "編輯客戶檔案開啟與取消",
          "steps": "點擊「編輯客戶檔案」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "目標頁面不可達，沒有「編輯客戶檔案」入口或彈窗；未修改資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-006_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-006_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-006",
            "彈窗取消",
            "編輯客戶檔案開啟與取消",
            "點擊「編輯客戶檔案」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-013_TC-007",
          "category": "必填校驗",
          "item": "編輯客戶檔案空白提交",
          "steps": "開啟編輯客戶檔案；清空標示必填欄位（賬單地址、收件人、數期）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "目標頁面不可達，沒有編輯表單及賬單地址、收件人、數期欄位可驗證；未保存。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-007_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-007_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-007",
            "必填校驗",
            "編輯客戶檔案空白提交",
            "開啟編輯客戶檔案；清空標示必填欄位（賬單地址、收件人、數期）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-013_TC-008",
          "category": "儲存回看",
          "item": "編輯客戶檔案有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊賬單地址、收件人、數期及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "目標頁面不可達，無法輸入或保存編輯資料；未修改既有資料，未觸發外部服務。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-008_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-008_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-008",
            "儲存回看",
            "編輯客戶檔案有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊賬單地址、收件人、數期及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-013_TC-009",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以FIN登入，進入會計客戶檔案；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "以財務黃檢查 PC／移動端切換；會計管理主內容仍空白，側欄沒有客戶檔案入口，無法檢查該頁欄位或響應式版面。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-013_TC-009_BLOCKED.png\",\"查看原圖\")",
          "sheet": "013_會計客戶檔案",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-013_TC-009_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-013_TC-009",
            "品牌視覺",
            "品牌版版面與響應式",
            "以FIN登入，進入會計客戶檔案；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-013",
        "會計客戶檔案",
        "會計",
        9,
        "=COUNTIF('013_會計客戶檔案'!$G$2:$G$10,\"PASS\")",
        "=COUNTIF('013_會計客戶檔案'!$G$2:$G$10,\"FAIL\")",
        "=COUNTIF('013_會計客戶檔案'!$G$2:$G$10,\"BLOCKED\")",
        "=COUNTIF('013_會計客戶檔案'!$G$2:$G$10,\"待确认\")",
        "=COUNTIF('013_會計客戶檔案'!$G$2:$G$10,\"未执行\")",
        "=IF(F14>0,\"有失敗\",IF(G14>0,\"受阻\",IF(I14=D14,\"未执行\",IF(I14>0,\"部分執行\",IF(H14>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-014",
      "name": "保養合約",
      "module": "會計",
      "sheet": "014_保養合約",
      "cases": [
        {
          "id": "PAGE-014_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 FIN 身份登入隔離靜態原型；經「會計管理→保養合約」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-014_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以財務黃登入後選擇「會計管理」，主內容區空白；導航僅有首頁、會計管理、統計報表，無「保養合約」入口，無法到達測試頁。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-001_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-001_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 FIN 身份登入隔離靜態原型；經「會計管理→保養合約」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-014_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-002",
          "category": "彈窗取消",
          "item": "新增合約開啟與取消",
          "steps": "點擊「新增合約」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "目標保養合約頁面不可達，沒有「新增合約」按鈕或對話框入口；未輸入或保存資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-002_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-002_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-002",
            "彈窗取消",
            "新增合約開啟與取消",
            "點擊「新增合約」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-003",
          "category": "必填校驗",
          "item": "新增合約空白提交",
          "steps": "開啟新增合約；清空標示必填欄位（客戶、開始日期、結束日期、金額、開單頻率）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "目標頁面不可達，沒有新增合約表單及客戶、日期、金額、頻率欄位可清空／提交；未觸發保存。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-003_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-003_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-003",
            "必填校驗",
            "新增合約空白提交",
            "開啟新增合約；清空標示必填欄位（客戶、開始日期、結束日期、金額、開單頻率）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-004",
          "category": "儲存回看",
          "item": "新增合約有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶、開始日期、結束日期、金額、開單頻率及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "目標頁面不可達，沒有合約表單可填寫；未新增記錄，未觸發外部服務或系統寫入。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-004_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-004_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-004",
            "儲存回看",
            "新增合約有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶、開始日期、結束日期、金額、開單頻率及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-005",
          "category": "彈窗取消",
          "item": "編輯合約開啟與取消",
          "steps": "點擊「編輯合約」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "目標頁面不可達，沒有「編輯合約」入口或彈窗；未修改資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-005_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-005_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-005",
            "彈窗取消",
            "編輯合約開啟與取消",
            "點擊「編輯合約」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-006",
          "category": "必填校驗",
          "item": "編輯合約空白提交",
          "steps": "開啟編輯合約；清空標示必填欄位（合同日期、開單頻率）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "目標頁面不可達，沒有合約編輯欄位可清空／提交；未觸發保存。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-006_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-006_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-006",
            "必填校驗",
            "編輯合約空白提交",
            "開啟編輯合約；清空標示必填欄位（合同日期、開單頻率）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-007",
          "category": "儲存回看",
          "item": "編輯合約有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊合同日期、開單頻率及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "目標頁面不可達，沒有編輯表單可輸入測試資料；未修改既有資料，未觸發外部服務。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-007_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-007_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-007",
            "儲存回看",
            "編輯合約有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊合同日期、開單頻率及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-008",
          "category": "校驗",
          "item": "結束早於開始",
          "steps": "新建測試合約，輸入結束日期早於開始日期並保存。",
          "expected": "阻止無效日期或清楚提示，不生成錯誤週期待開票資料。",
          "actual": "目標頁面不可達，沒有合約日期表單，無法測試結束早於開始；未建立合約或週期資料。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-008_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-008_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-008",
            "校驗",
            "結束早於開始",
            "新建測試合約，輸入結束日期早於開始日期並保存。",
            "阻止無效日期或清楚提示，不生成錯誤週期待開票資料。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-009",
          "category": "週期顯示",
          "item": "週期帳單查看",
          "steps": "查看既有合約日期與開單頻率，切換待開票再返回。",
          "expected": "來源合約與所展示帳單期間可核對；未批准開票規則記待確認。",
          "actual": "目標頁面不可達，沒有既有合約、開單頻率或待開票期間可核對；無法檢查週期顯示。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-009_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-009_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-009",
            "週期顯示",
            "週期帳單查看",
            "查看既有合約日期與開單頻率，切換待開票再返回。",
            "來源合約與所展示帳單期間可核對；未批准開票規則記待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-010",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以FIN登入，進入保養合約；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "以財務黃切換 PC／移動端；會計管理主內容仍空白，側欄沒有保養合約入口，無法檢查該頁欄位或響應式版面。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-010_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 11,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-010_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-010",
            "品牌視覺",
            "品牌版版面與響應式",
            "以FIN登入，進入保養合約；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-014_TC-011",
          "category": "歷史BUG回歸",
          "item": "BUG-007 回歸",
          "steps": "在隔離數據中新建結束早於開始日期的合約。",
          "expected": "拒絕反向日期並給予提示。",
          "actual": "歷史 BUG-007 的日期反向回歸因目標合約頁面不可達、沒有日期欄位而無法驗證；未建立合約。",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-014_TC-011_BLOCKED.png\",\"查看原圖\")",
          "sheet": "014_保養合約",
          "row": 12,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-014_TC-011_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-014_TC-011",
            "歷史BUG回歸",
            "BUG-007 回歸",
            "在隔離數據中新建結束早於開始日期的合約。",
            "拒絕反向日期並給予提示。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-014",
        "保養合約",
        "會計",
        11,
        "=COUNTIF('014_保養合約'!$G$2:$G$12,\"PASS\")",
        "=COUNTIF('014_保養合約'!$G$2:$G$12,\"FAIL\")",
        "=COUNTIF('014_保養合約'!$G$2:$G$12,\"BLOCKED\")",
        "=COUNTIF('014_保養合約'!$G$2:$G$12,\"待确认\")",
        "=COUNTIF('014_保養合約'!$G$2:$G$12,\"未执行\")",
        "=IF(F15>0,\"有失敗\",IF(G15>0,\"受阻\",IF(I15=D15,\"未执行\",IF(I15>0,\"部分執行\",IF(H15>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-015",
      "name": "報告管理",
      "module": "報告",
      "sheet": "015_報告管理",
      "cases": [
        {
          "id": "PAGE-015_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 CR／TL／MASTER 身份登入隔離靜態原型；經「側欄→報告管理」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-015_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以 CR 何關係登入，從側欄進入報告管理；頁面標題、角色、報告總數、篩選區及 5 筆列表均顯示。捲動到底仍可查看最後一列，沒有內容遮擋。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "015_報告管理",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-015_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 CR／TL／MASTER 身份登入隔離靜態原型；經「側欄→報告管理」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-015_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-015_TC-002",
          "category": "搜尋篩選",
          "item": "報告編號、客戶及狀態與無結果恢復",
          "steps": "記下首筆資料；使用報告編號、客戶及狀態查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "在「已完成」狀態搜尋 SR-250298，找到安全監控管理有限公司的對應報告，共 1 筆。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-019",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-002_PASS_20261109.png\",\"查看回歸截圖\")",
          "sheet": "015_報告管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-002_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-015_TC-002",
            "搜尋篩選",
            "報告編號、客戶及狀態與無結果恢復",
            "記下首筆資料；使用報告編號、客戶及狀態查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-015_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉服務報告／完工紙",
          "steps": "記下首筆編號與名稱；點擊服務報告／完工紙；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "開啟首筆 CP 完工單詳情，CP-CP-DEMO-P-001 與 WO-DEMO-FIN-P-001、客戶及狀態和列表一致；詳情含基本資料、成交維修清單、完工單圖片及流轉紀錄。面板沒有分頁可切換；捲到底後點關閉，返回列表並可繼續操作。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "015_報告管理",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-015_TC-003",
            "詳情抽屜",
            "開啟及關閉服務報告／完工紙",
            "記下首筆編號與名稱；點擊服務報告／完工紙；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-015_TC-004",
          "category": "類型顯示",
          "item": "CP與SR區別",
          "steps": "分別查看既有 CP 與 SR 樣例的編號、內容與狀態標籤。",
          "expected": "兩類標題及資料不混用；未提交資料有空態。",
          "actual": "列表將 CP-CP-DEMO-P-001 標示為「完工單」，開啟後詳情標題為「完工單詳情」；SR-250412 標示為「服務報告」，開啟後詳情標題為「服務報告詳情」，編號、工單及客戶資料各自對應，未見類型或資料串用。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-004_PASS_CP.png\",\"查看原圖\")",
          "sheet": "015_報告管理",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-004_PASS_CP.png"
          ],
          "baseline": [
            "PAGE-015_TC-004",
            "類型顯示",
            "CP與SR區別",
            "分別查看既有 CP 與 SR 樣例的編號、內容與狀態標籤。",
            "兩類標題及資料不混用；未提交資料有空態。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-015_TC-005",
          "category": "彈窗取消",
          "item": "發送報告開啟與取消",
          "steps": "點擊「發送報告」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "移動端客戶報告卡片 SR-250298 開啟「發送客戶」後，Email 發送窗顯示對應報告、收件欄及附件；將主題改為 QA-20261106-CANCEL 後按「取消」，返回原報告卡片，仍為 1 份報告。未點擊確認發送。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "015_報告管理",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-015_TC-005",
            "彈窗取消",
            "發送報告開啟與取消",
            "點擊「發送報告」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-015_TC-006",
          "category": "外部邊界",
          "item": "發送僅檢查不實送",
          "steps": "開發送方式選擇並取消，不點最終發送；查看既有發送記錄。",
          "expected": "取消不新增發送記錄；本輪不發郵件／WhatsApp。",
          "actual": "同一服務報告發送窗切換至 WhatsApp，畫面顯示相應方式及消息內容；按「取消」後返回 SR-250298 卡片，列表仍為 1 份報告。未點擊確認發送，沒有發送郵件／WhatsApp 或外部寫入。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-006_PASS.png\",\"查看原圖\")",
          "sheet": "015_報告管理",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-015_TC-006",
            "外部邊界",
            "發送僅檢查不實送",
            "開發送方式選擇並取消，不點最終發送；查看既有發送記錄。",
            "取消不新增發送記錄；本輪不發郵件／WhatsApp。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-015_TC-007",
          "category": "列印",
          "item": "報告預覽取消",
          "steps": "開既有報告預覽，捲動檢查末頁並取消。",
          "expected": "預覽與編號一致，表格和簽名區可見；真實列印權限未決記待確認。",
          "actual": "PC及移動端 SR-250298 詳情均可進入兩頁唯讀列印預覽；PC末頁可見簽名區。沒有觸發實際列印。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-020",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-007_PASS_MOBILE_20261109.png\",\"查看移動端預覽\")",
          "sheet": "015_報告管理",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-007_PASS_MOBILE_20261109.png"
          ],
          "baseline": [
            "PAGE-015_TC-007",
            "列印",
            "報告預覽取消",
            "開既有報告預覽，捲動檢查末頁並取消。",
            "預覽與編號一致，表格和簽名區可見；真實列印權限未決記待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-015_TC-008",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以CR／TL／MASTER登入，進入報告管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "先查看 PC 報告列表，再切換原型內建移動端並進入「報告」底部頁籤；移動端報告卡片、狀態、主要資訊及查看／發送按鈕可讀且未見橫向溢出。此項檢查使用原型的移動端模式，沒有使用獨立 390px 瀏覽器視口。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-008_PASS.png\",\"查看原圖\")",
          "sheet": "015_報告管理",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-008_PASS.png"
          ],
          "baseline": [
            "PAGE-015_TC-008",
            "品牌視覺",
            "品牌版版面與響應式",
            "以CR／TL／MASTER登入，進入報告管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-015",
        "報告管理",
        "報告",
        8,
        "=COUNTIF('015_報告管理'!$G$2:$G$9,\"PASS\")",
        "=COUNTIF('015_報告管理'!$G$2:$G$9,\"FAIL\")",
        "=COUNTIF('015_報告管理'!$G$2:$G$9,\"BLOCKED\")",
        "=COUNTIF('015_報告管理'!$G$2:$G$9,\"待确认\")",
        "=COUNTIF('015_報告管理'!$G$2:$G$9,\"未执行\")",
        "=IF(F16>0,\"有失敗\",IF(G16>0,\"受阻\",IF(I16=D16,\"未执行\",IF(I16>0,\"部分執行\",IF(H16>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-016",
      "name": "統計報表",
      "module": "報表",
      "sheet": "016_統計報表",
      "cases": [
        {
          "id": "PAGE-016_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 ADMIN／BOSS／FIN 身份登入隔離靜態原型；經「側欄→統計報表」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-016_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以系統管理員從側欄進入統計報表；標題、身份、統計卡片、提醒、狀態／類型／區域圖表、客戶與區域中單表、7日趨勢均可見；捲動到底可到達趨勢區。另以管理層及會計部角色確認可進入統計報表。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-016_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "016_統計報表",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-016_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-016_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 ADMIN／BOSS／FIN 身份登入隔離靜態原型；經「側欄→統計報表」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-016_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-016_TC-002",
          "category": "統計",
          "item": "狀態及類型圖表",
          "steps": "查看 CALL總數與各狀態數；對照 CALL列表既有資料，逐一檢查狀態、類型、區域圖表。",
          "expected": "數字可與同範圍資料核對，圖例和標籤清楚，不出現NaN。",
          "actual": "CALL管理選「已安排」+ 類別 M，顯示 5 筆；類型、區域圖表仍與列表資料相符。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-021",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-016_TC-002_PASS_20261109.png\",\"查看回歸截圖\")",
          "sheet": "016_統計報表",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-016_TC-002_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-016_TC-002",
            "統計",
            "狀態及類型圖表",
            "查看 CALL總數與各狀態數；對照 CALL列表既有資料，逐一檢查狀態、類型、區域圖表。",
            "數字可與同範圍資料核對，圖例和標籤清楚，不出現NaN。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-016_TC-003",
          "category": "提醒",
          "item": "Outstanding提示",
          "steps": "查看未完成、SR待簽名等提醒，核對其樣例編號及類別。",
          "expected": "提示類別及樣例對應；提醒未實現自動定時時不判定自動通知通過。",
          "actual": "點擊Outstanding樣例ECA-20261107-001後打開工單詳情，顯示狀態「待分派」、客戶香港政府大樓、類別M，對應「11未完成工單（待分派/處理中）」提醒；提醒樣例可開啟查看。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-016_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "016_統計報表",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-016_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-016_TC-003",
            "提醒",
            "Outstanding提示",
            "查看未完成、SR待簽名等提醒，核對其樣例編號及類別。",
            "提示類別及樣例對應；提醒未實現自動定時時不判定自動通知通過。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-016_TC-004",
          "category": "待確認規則",
          "item": "中單統計口徑",
          "steps": "比較報價管理狀態與報表的中單／中標口徑，記錄觀察。",
          "expected": "缺少批准統計定義時記待確認，不直接以機器數字視為業務正確。",
          "actual": "以管理層身份查看報價管理，狀態頁籤為待報價2、修訂中5、已中單4、丟單1；統計報表同時顯示已中單4、未中單3、中單率33.3%。未找到已確認的中單率統計口徑，故標記待确认，未判定為系統錯誤。",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-016_TC-004_TBD.png\",\"查看原圖\")",
          "sheet": "016_統計報表",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-016_TC-004_TBD.png"
          ],
          "baseline": [
            "PAGE-016_TC-004",
            "待確認規則",
            "中單統計口徑",
            "比較報價管理狀態與報表的中單／中標口徑，記錄觀察。",
            "缺少批准統計定義時記待確認，不直接以機器數字視為業務正確。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-016_TC-005",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以ADMIN／BOSS／FIN登入，進入統計報表；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "在桌面尺寸以系統管理員、管理層及會計部身份查看統計報表，均可進入；在390px窄屏，統計卡片與報價表／趨勢區可縱向查看且沒有整頁橫向溢出。但窄屏完全隱藏側邊導航，畫面沒有漢堡菜單或其他導航入口；只顯示PC端／移動端切換、通知與身份選單，無法由本頁轉往其他主頁。已記BUG-022。",
          "result": "FAIL",
          "bugId": "BUG-022",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-016_TC-005_FAIL.png\",\"查看原圖\")",
          "sheet": "016_統計報表",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-016_TC-005_FAIL.png"
          ],
          "baseline": [
            "PAGE-016_TC-005",
            "品牌視覺",
            "品牌版版面與響應式",
            "以ADMIN／BOSS／FIN登入，進入統計報表；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-016",
        "統計報表",
        "報表",
        5,
        "=COUNTIF('016_統計報表'!$G$2:$G$6,\"PASS\")",
        "=COUNTIF('016_統計報表'!$G$2:$G$6,\"FAIL\")",
        "=COUNTIF('016_統計報表'!$G$2:$G$6,\"BLOCKED\")",
        "=COUNTIF('016_統計報表'!$G$2:$G$6,\"待确认\")",
        "=COUNTIF('016_統計報表'!$G$2:$G$6,\"未执行\")",
        "=IF(F17>0,\"有失敗\",IF(G17>0,\"受阻\",IF(I17=D17,\"未执行\",IF(I17>0,\"部分執行\",IF(H17>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-017",
      "name": "字典管理",
      "module": "基礎設置",
      "sheet": "017_字典管理",
      "cases": [
        {
          "id": "PAGE-017_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→字典管理」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-017_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以系統管理員從「基礎設置→字典管理」進入；頁面標題、角色、分類按鈕及3筆基礎Call類型資料均顯示，頁面主體在桌面視口內可閱讀，未見遮擋。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-017_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→字典管理」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-017_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-002",
          "category": "分類",
          "item": "各字典分類切換",
          "steps": "依次切換Call類型、區域、Call代碼及報價類別；記下列名及首筆。",
          "expected": "分類高亮與列內容一致，不顯示上一分類資料。",
          "actual": "依次切換Call類型、區域、Call代碼、報價類別；分類選中狀態隨點擊切換，列表列名及資料隨分類更新：Call類型顯示M/P/M+P，區域顯示DR區域編碼，Call代碼顯示CC001/CALL-001等，報價類別顯示代碼及說明欄。未見上一分類資料殘留在列內容中。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-017_TC-002",
            "分類",
            "各字典分類切換",
            "依次切換Call類型、區域、Call代碼及報價類別；記下列名及首筆。",
            "分類高亮與列內容一致，不顯示上一分類資料。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-003",
          "category": "彈窗取消",
          "item": "新增字典項開啟與取消",
          "steps": "點擊「新增字典項」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "在報價類別列表打開新增，輸入名稱QA-20261107-CANCEL及代碼QA-CANCEL後取消；列表仍只有原3筆。重新打開表單欄位為空，關閉後無遮罩殘留。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-017_TC-003",
            "彈窗取消",
            "新增字典項開啟與取消",
            "點擊「新增字典項」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-004",
          "category": "必填校驗",
          "item": "新增字典項空白提交",
          "steps": "開啟新增字典項；清空標示必填欄位（代碼、名稱及畫面必填欄位）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "在新增表單不填類別名稱及類別代碼直接保存；頁面提示「請填寫必填字段：類別名稱、類別代碼」，表單保持開啟，列表仍為原3筆，未新增空白項。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-017_TC-004",
            "必填校驗",
            "新增字典項空白提交",
            "開啟新增字典項；清空標示必填欄位（代碼、名稱及畫面必填欄位）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-005",
          "category": "儲存回看",
          "item": "新增字典項有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊代碼、名稱及畫面必填欄位及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "在隔離本機原型新增名稱QA-20261107-TEST、代碼QA-20261107、描述Luna UI QA temporary data並啟用，畫面提示新增成功，列表新增D報004。重新整理後需重新選系統管理員並回到字典管理，列表仍可見QA名稱及代碼。完成測試後已清理此臨時測試項。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-017_TC-005",
            "儲存回看",
            "新增字典項有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊代碼、名稱及畫面必填欄位及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-006",
          "category": "彈窗取消",
          "item": "編輯字典項開啟與取消",
          "steps": "點擊「編輯字典項」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "對D報004打開編輯，將名稱暫改為QA-20261107-CANCEL後取消；回到列表仍顯示QA-20261107-TEST／QA-20261107，未保存編輯值。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-006_PASS.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-017_TC-006",
            "彈窗取消",
            "編輯字典項開啟與取消",
            "點擊「編輯字典項」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-007",
          "category": "必填校驗",
          "item": "編輯字典項空白提交",
          "steps": "開啟編輯字典項；清空標示必填欄位（名稱與狀態）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "對測試字典項打開編輯表單。實際表單只有名稱（必填）及編碼欄位，沒有狀態控制；清空名稱及編碼後保存，提示「請填寫必填字段：名稱」，未保存空白資料。用例要求驗證名稱及狀態必填，但狀態欄位不存在，無法完成該項校驗，記BUG-023。",
          "result": "FAIL",
          "bugId": "BUG-023",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-007_FAIL.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-007_FAIL.png"
          ],
          "baseline": [
            "PAGE-017_TC-007",
            "必填校驗",
            "編輯字典項空白提交",
            "開啟編輯字典項；清空標示必填欄位（名稱與狀態）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-008",
          "category": "儲存回看",
          "item": "編輯字典項有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊名稱與狀態及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "將隔離測試項名稱改為QA-20261107-EDITED、編碼改為QA-20261107-EDIT後保存，提示保存成功；重新整理、重新登入系統管理員並重開字典管理，列表與編輯表單均保留新名稱及代碼。編輯表單沒有狀態欄位，無法按用例要求同時更新狀態，記BUG-023。完成後已清理臨時測試項。",
          "result": "FAIL",
          "bugId": "BUG-023",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-008_FAIL.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-008_FAIL.png"
          ],
          "baseline": [
            "PAGE-017_TC-008",
            "儲存回看",
            "編輯字典項有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊名稱與狀態及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-009",
          "category": "彈窗取消",
          "item": "刪除字典項開啟與取消",
          "steps": "點擊「刪除字典項」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "對隔離測試字典項點擊刪除，確認框提示「確定刪除該Call類型？」及影響說明；點擊取消後D報004仍在列表，遮罩關閉。",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-009_PASS.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-009_PASS.png"
          ],
          "baseline": [
            "PAGE-017_TC-009",
            "彈窗取消",
            "刪除字典項開啟與取消",
            "點擊「刪除字典項」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-010",
          "category": "校驗",
          "item": "重複代碼",
          "steps": "新增測試項並輸入既有代碼，嘗試保存。",
          "expected": "不靜默產生無法辨識的重複項；重複准入政策未明則記待確認。",
          "actual": "新增名稱QA-20261107-DUPLICATE並使用既有代碼QA-20261107-EDIT後，畫面提示新增成功，列表同時顯示兩筆同代碼記錄。重複准入政策未確認，按基線標記待確認，未判定BUG；已刪除本輪新建的重複測試項。",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-010_TBD.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 11,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-010_TBD.png"
          ],
          "baseline": [
            "PAGE-017_TC-010",
            "校驗",
            "重複代碼",
            "新增測試項並輸入既有代碼，嘗試保存。",
            "不靜默產生無法辨識的重複項；重複准入政策未明則記待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-017_TC-011",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以ADMIN登入，進入字典管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "以系統管理員在390×645窄屏查看字典管理；標題、分類、名稱欄及新增／編輯／刪除操作可讀可用，頁面縱向排版且沒有整頁橫向溢出。窄屏下側邊導航完全隱藏，沒有漢堡菜單或其他主導航入口；代碼、狀態及創建時間欄亦未在窄屏表格中顯示。導航缺失與統計報表共用BUG-022。",
          "result": "FAIL",
          "bugId": "BUG-022",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-011_FAIL.png\",\"查看原圖\")",
          "sheet": "017_字典管理",
          "row": 12,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-011_FAIL.png"
          ],
          "baseline": [
            "PAGE-017_TC-011",
            "品牌視覺",
            "品牌版版面與響應式",
            "以ADMIN登入，進入字典管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-017",
        "字典管理",
        "基礎設置",
        11,
        "=COUNTIF('017_字典管理'!$G$2:$G$12,\"PASS\")",
        "=COUNTIF('017_字典管理'!$G$2:$G$12,\"FAIL\")",
        "=COUNTIF('017_字典管理'!$G$2:$G$12,\"BLOCKED\")",
        "=COUNTIF('017_字典管理'!$G$2:$G$12,\"待确认\")",
        "=COUNTIF('017_字典管理'!$G$2:$G$12,\"未执行\")",
        "=IF(F18>0,\"有失敗\",IF(G18>0,\"受阻\",IF(I18=D18,\"未执行\",IF(I18>0,\"部分執行\",IF(H18>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-018",
      "name": "客戶管理",
      "module": "基礎設置",
      "sheet": "018_客戶管理",
      "cases": [
        {
          "id": "PAGE-018_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 CS／ADMIN 身份登入隔離靜態原型；經「基礎設置→客戶管理；客戶詳情及新建／編輯歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-018_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以系統管理員進入「基礎設置→客戶管理」；頁面標題、角色及客戶列表成功載入，主要欄位和操作可見，頁面可縱向瀏覽。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-018_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 CS／ADMIN 身份登入隔離靜態原型；經「基礎設置→客戶管理；客戶詳情及新建／編輯歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-018_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-002",
          "category": "搜尋篩選",
          "item": "客戶名稱、類型及區域與無結果恢復",
          "steps": "記下首筆資料；使用客戶名稱、類型及區域查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "使用已存在客戶的名稱、類型及區域篩選後找到該筆；輸入 QA-NO-MATCH-20261106 顯示空狀態；清除條件後列表恢復。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-018_TC-002",
            "搜尋篩選",
            "客戶名稱、類型及區域與無結果恢復",
            "記下首筆資料；使用客戶名稱、類型及區域查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉客戶詳情",
          "steps": "記下首筆編號與名稱；點擊客戶詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "打開首筆客戶詳情，編號及名稱與列表來源相符；可見資料內容一致，關閉詳情後列表可繼續操作。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-018_TC-003",
            "詳情抽屜",
            "開啟及關閉客戶詳情",
            "記下首筆編號與名稱；點擊客戶詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-004",
          "category": "彈窗取消",
          "item": "新建客戶開啟與取消",
          "steps": "點擊「新建客戶」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "打開新增客戶表單輸入臨時名稱後取消；表單關閉且列表沒有新增記錄。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-018_TC-004",
            "彈窗取消",
            "新建客戶開啟與取消",
            "點擊「新建客戶」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-005",
          "category": "必填校驗",
          "item": "新建客戶空白提交",
          "steps": "開啟新建客戶；清空標示必填欄位（客戶名稱、類型、聯絡資料及畫面必填欄位）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "新增客戶欄位留空提交；頁面顯示必填校驗，未建立空白客戶。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-018_TC-005",
            "必填校驗",
            "新建客戶空白提交",
            "開啟新建客戶；清空標示必填欄位（客戶名稱、類型、聯絡資料及畫面必填欄位）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-006",
          "category": "儲存回看",
          "item": "新建客戶有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶名稱、類型、聯絡資料及畫面必填欄位及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "在本機隔離原型建立 QA-20261107-LUNA 測試客戶（合約編號 1P2600013），保存後列表可見；重新整理及重新登入後記錄仍可查看。測試結束後已從原型頁面移除本地測試客戶。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-006_PASS.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-018_TC-006",
            "儲存回看",
            "新建客戶有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊客戶名稱、類型、聯絡資料及畫面必填欄位及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-007",
          "category": "彈窗取消",
          "item": "編輯客戶開啟與取消",
          "steps": "點擊「編輯客戶」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "打開客戶編輯、改動欄位後取消；重新查看時原有資料保持不變。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-007_PASS.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-007_PASS.png"
          ],
          "baseline": [
            "PAGE-018_TC-007",
            "彈窗取消",
            "編輯客戶開啟與取消",
            "點擊「編輯客戶」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-008",
          "category": "必填校驗",
          "item": "編輯客戶空白提交",
          "steps": "開啟編輯客戶；清空標示必填欄位（聯絡人、電話、地址）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "清空編輯客戶表單中的聯絡人、電話及地址後保存；頁面顯示「客戶資訊已更新」並關閉表單，但列表資料仍是原值，成功訊息與實際保存結果不一致。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-025",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-008_FAIL.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-008_FAIL.png"
          ],
          "baseline": [
            "PAGE-018_TC-008",
            "必填校驗",
            "編輯客戶空白提交",
            "開啟編輯客戶；清空標示必填欄位（聯絡人、電話、地址）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-009",
          "category": "儲存回看",
          "item": "編輯客戶有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊聯絡人、電話、地址及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "編輯港島商業中心聯絡人為 QA 值並保存；刷新、重新登入後仍保留。測後恢復原值陳先生並刷新確認。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-013",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-009_PASS_20261109.png\",\"查看回歸截圖\")",
          "sheet": "018_客戶管理",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-009_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-018_TC-009",
            "儲存回看",
            "編輯客戶有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊聯絡人、電話、地址及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-010",
          "category": "導航",
          "item": "客戶關聯CALL與報價",
          "steps": "在詳情開 CALL歷史、關聯報價並核對客戶，再返回；開新建報價後取消。",
          "expected": "關聯記錄屬於選中客戶；預填客戶正確；取消不產生報價。",
          "actual": "檢查客戶詳情沒有可見的 CALL 歷史或關聯報價資訊，也沒有從該客戶預填客戶資料的新建報價入口；單獨打開新建報價後取消，未留下報價記錄。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-026",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-010_FAIL.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 11,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-010_FAIL.png"
          ],
          "baseline": [
            "PAGE-018_TC-010",
            "導航",
            "客戶關聯CALL與報價",
            "在詳情開 CALL歷史、關聯報價並核對客戶，再返回；開新建報價後取消。",
            "關聯記錄屬於選中客戶；預填客戶正確；取消不產生報價。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-011",
          "category": "校驗",
          "item": "電話及長名稱",
          "steps": "新建測試客戶輸入電話abc、超長名稱後嘗試保存。",
          "expected": "有格式限制時顯示明確提示；名稱不破壞列表布局；電話規格未批准記待確認。",
          "actual": "使用電話 abc 及超長客戶名稱嘗試保存；畫面接受該電話值，長名稱在列表中換行。電話格式規則尚未確認，故標記待確認。（本輪實測：2026-11-07）",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-011_TBD.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 12,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-011_TBD.png"
          ],
          "baseline": [
            "PAGE-018_TC-011",
            "校驗",
            "電話及長名稱",
            "新建測試客戶輸入電話abc、超長名稱後嘗試保存。",
            "有格式限制時顯示明確提示；名稱不破壞列表布局；電話規格未批准記待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-012",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以CS／ADMIN登入，進入客戶管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "在 390×645 窄屏檢查客戶頁，表格透過內部水平捲動可查看後續欄位及操作；標題、篩選與主要控制可用，內容未被整頁裁切。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-012_PASS.png\",\"查看原圖\")",
          "sheet": "018_客戶管理",
          "row": 13,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-012_PASS.png"
          ],
          "baseline": [
            "PAGE-018_TC-012",
            "品牌視覺",
            "品牌版版面與響應式",
            "以CS／ADMIN登入，進入客戶管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-018_TC-013",
          "category": "歷史BUG回歸",
          "item": "BUG-013 回歸",
          "steps": "建立隔離測試客戶，修改聯絡人，保存、刷新及重新登入後查看。",
          "expected": "刷新後仍顯示修改後聯絡人。",
          "actual": "重測歷史 BUG-013：編輯聯絡人、保存、刷新及重新登入後仍顯示新值；隨後將客戶資料恢復原值。回歸 PASS（2026-11-09）。",
          "result": "PASS",
          "bugId": "BUG-013",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-009_PASS_20261109.png\",\"查看回歸截圖\")",
          "sheet": "018_客戶管理",
          "row": 14,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-009_PASS_20261109.png"
          ],
          "baseline": [
            "PAGE-018_TC-013",
            "歷史BUG回歸",
            "BUG-013 回歸",
            "建立隔離測試客戶，修改聯絡人，保存、刷新及重新登入後查看。",
            "刷新後仍顯示修改後聯絡人。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-018",
        "客戶管理",
        "基礎設置",
        13,
        "=COUNTIF('018_客戶管理'!$G$2:$G$14,\"PASS\")",
        "=COUNTIF('018_客戶管理'!$G$2:$G$14,\"FAIL\")",
        "=COUNTIF('018_客戶管理'!$G$2:$G$14,\"BLOCKED\")",
        "=COUNTIF('018_客戶管理'!$G$2:$G$14,\"待确认\")",
        "=COUNTIF('018_客戶管理'!$G$2:$G$14,\"未执行\")",
        "=IF(F19>0,\"有失敗\",IF(G19>0,\"受阻\",IF(I19=D19,\"未执行\",IF(I19>0,\"部分執行\",IF(H19>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-019",
      "name": "用戶管理",
      "module": "基礎設置",
      "sheet": "019_用戶管理",
      "cases": [
        {
          "id": "PAGE-019_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→用戶管理；詳情面板及新增／編輯彈窗歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-019_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以系統管理員進入「基礎設置→用戶管理」；頁面標題、角色分類、用戶列表及詳情區塊可見，主要操作可使用。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-019_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→用戶管理；詳情面板及新增／編輯彈窗歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-019_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-002",
          "category": "搜尋篩選",
          "item": "角色、姓名及啟用狀態與無結果恢復",
          "steps": "記下首筆資料；使用角色、姓名及啟用狀態查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
          "expected": "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
          "actual": "搜尋 EMP0008 並選「師傅／啓用」找到陳大文；輸入 QA-NO-MATCH-20261106 顯示無匹配空狀態；清除搜尋與篩選後列表恢復。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-002_MATCH.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-002_MATCH.png"
          ],
          "baseline": [
            "PAGE-019_TC-002",
            "搜尋篩選",
            "角色、姓名及啟用狀態與無結果恢復",
            "記下首筆資料；使用角色、姓名及啟用狀態查找該筆；再輸入 QA-NO-MATCH-20261106；最後清除條件。",
            "已知資料能找到；無匹配時顯示空態；清除後恢復列表，不殘留前次結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉用戶詳情面板",
          "steps": "記下首筆編號與名稱；點擊用戶詳情面板；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "打開陳大文 EMP0008 詳情可看到姓名、角色及權限內容，但面板沒有關閉按鈕；再次點擊同一列或「查看」仍不會收起面板，無法按預期操作返回。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-027",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-003_FAIL.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-003_FAIL.png"
          ],
          "baseline": [
            "PAGE-019_TC-003",
            "詳情抽屜",
            "開啟及關閉用戶詳情面板",
            "記下首筆編號與名稱；點擊用戶詳情面板；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-004",
          "category": "彈窗取消",
          "item": "新增用戶開啟與取消",
          "steps": "點擊「新增用戶」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "打開新增用戶表單、輸入臨時名稱後取消；對話框關閉且記錄總數不變。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-019_TC-004",
            "彈窗取消",
            "新增用戶開啟與取消",
            "點擊「新增用戶」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-005",
          "category": "必填校驗",
          "item": "新增用戶空白提交",
          "steps": "開啟新增用戶；清空標示必填欄位（姓名、角色及畫面必填欄位）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "新增用戶資料全空提交；瀏覽器顯示「請填寫此字段。」必填提示，表單保留且未新增記錄。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-019_TC-005",
            "必填校驗",
            "新增用戶空白提交",
            "開啟新增用戶；清空標示必填欄位（姓名、角色及畫面必填欄位）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-006",
          "category": "儲存回看",
          "item": "新增用戶有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊姓名、角色及畫面必填欄位及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "建立本機隔離測試帳戶 QA Luna Local 20261107／QATEST061；列表及詳情顯示資料，重新整理及以系統管理員重新登入後仍可見。該測試帳戶保留於本機原型資料，因刪除確認明示「此操作不可恢復」，本輪取消了刪除確認。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-006_PASS.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-019_TC-006",
            "儲存回看",
            "新增用戶有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊姓名、角色及畫面必填欄位及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-007",
          "category": "彈窗取消",
          "item": "編輯用戶開啟與取消",
          "steps": "點擊「編輯用戶」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "編輯測試帳戶名稱後取消；列表與詳情仍顯示原名稱，未保存臨時變更。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-007_PASS.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-007_PASS.png"
          ],
          "baseline": [
            "PAGE-019_TC-007",
            "彈窗取消",
            "編輯用戶開啟與取消",
            "點擊「編輯用戶」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-008",
          "category": "必填校驗",
          "item": "編輯用戶空白提交",
          "steps": "開啟編輯用戶；清空標示必填欄位（角色、區域、啟用狀態）；點擊保存／提交。",
          "expected": "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
          "actual": "編輯表單中的角色、區域及狀態下拉均沒有空白或清除選項，無法以頁面操作構造「角色／區域／啓用狀態為空」的提交；未更改或保存資料，標記 BLOCKED。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-008_BLOCKED.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-008_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-019_TC-008",
            "必填校驗",
            "編輯用戶空白提交",
            "開啟編輯用戶；清空標示必填欄位（角色、區域、啟用狀態）；點擊保存／提交。",
            "阻止保存並指出缺少欄位；保留已輸入內容，不新增空白記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-009",
          "category": "儲存回看",
          "item": "編輯用戶有效資料保存",
          "steps": "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊角色、區域、啟用狀態及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
          "expected": "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
          "actual": "將本地測試帳戶電話改為 +85200000078、角色改為客戶關係部、區域改為2區後保存；列表及詳情更新，重新整理並重新登入後值仍保留。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-009_PASS.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-009_PASS.png"
          ],
          "baseline": [
            "PAGE-019_TC-009",
            "儲存回看",
            "編輯用戶有效資料保存",
            "只在隔離本機靜態原型中填入 QA-20261106 測試資料，補齊角色、區域、啟用狀態及其餘必填欄位；保存；返回列表並重新開啟；重新整理再查看。",
            "成功提示與實際列表一致；資料與輸入相符；重新開啟及重新整理後仍可讀取；不觸發外部服務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-010",
          "category": "角色呈現",
          "item": "角色詳情與操作",
          "steps": "依次點角色分類及用戶，核對角色名稱、權限說明與實際菜單；不冒充後端安全測試。",
          "expected": "用戶和角色內容一致；權限矩陣未批准部分記待確認。",
          "actual": "按角色分類篩選「客戶關係部」後列表顯示4筆且測試帳戶角色一致；詳情顯示該角色及權限清單。後端安全權限與權限矩陣未批准，無法判定每項授權是否符合業務規則，標記待確認。（本輪實測：2026-11-07）",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-010_TBD.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 11,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-010_TBD.png"
          ],
          "baseline": [
            "PAGE-019_TC-010",
            "角色呈現",
            "角色詳情與操作",
            "依次點角色分類及用戶，核對角色名稱、權限說明與實際菜單；不冒充後端安全測試。",
            "用戶和角色內容一致；權限矩陣未批准部分記待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-019_TC-011",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以ADMIN登入，進入用戶管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "390×645 窄屏下頁首顯示標題及新增入口，但無側邊導航、漢堡按鈕或替代主導航。用戶表可水平捲動至查看／編輯操作，操作可觸及；導航缺失與統計報表、字典管理共用 BUG-022。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-022",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-011_NAV_FAIL.png\",\"查看原圖\")",
          "sheet": "019_用戶管理",
          "row": 12,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-011_NAV_FAIL.png"
          ],
          "baseline": [
            "PAGE-019_TC-011",
            "品牌視覺",
            "品牌版版面與響應式",
            "以ADMIN登入，進入用戶管理；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-019",
        "用戶管理",
        "基礎設置",
        11,
        "=COUNTIF('019_用戶管理'!$G$2:$G$12,\"PASS\")",
        "=COUNTIF('019_用戶管理'!$G$2:$G$12,\"FAIL\")",
        "=COUNTIF('019_用戶管理'!$G$2:$G$12,\"BLOCKED\")",
        "=COUNTIF('019_用戶管理'!$G$2:$G$12,\"待确认\")",
        "=COUNTIF('019_用戶管理'!$G$2:$G$12,\"未执行\")",
        "=IF(F20>0,\"有失敗\",IF(G20>0,\"受阻\",IF(I20=D20,\"未执行\",IF(I20>0,\"部分執行\",IF(H20>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-020",
      "name": "服務器空間",
      "module": "基礎設置",
      "sheet": "020_服務器空間",
      "cases": [
        {
          "id": "PAGE-020_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→服務器空間」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-020_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以系統管理員進入「基礎設置→服務器空間」；內容區顯示服務器空間設定，但全局頁首仍顯示「字典管理」，與目前頁面不一致。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-028",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-020_TC-001_FAIL.png\",\"查看原圖\")",
          "sheet": "020_服務器空間",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-020_TC-001_FAIL.png"
          ],
          "baseline": [
            "PAGE-020_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→服務器空間」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-020_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-020_TC-002",
          "category": "配置展示",
          "item": "服務商欄位聯動",
          "steps": "記下現有配置，切換服務商查看區域、Endpoint及相關欄位；離開且不保存。",
          "expected": "欄位與選中服務商一致；未保存切換不改持久配置。",
          "actual": "將服務商切換為「騰訊雲 COS」；服務商選項改變，但區域、Endpoint、Bucket 及摘要仍顯示阿里雲 OSS 的值。未保存切換。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-029",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-020_TC-002_FAIL.png\",\"查看原圖\")",
          "sheet": "020_服務器空間",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-020_TC-002_FAIL.png"
          ],
          "baseline": [
            "PAGE-020_TC-002",
            "配置展示",
            "服務商欄位聯動",
            "記下現有配置，切換服務商查看區域、Endpoint及相關欄位；離開且不保存。",
            "欄位與選中服務商一致；未保存切換不改持久配置。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-020_TC-003",
          "category": "敏感資訊",
          "item": "憑證顯示",
          "steps": "查看憑證輸入框是否遮罩；檢查頁面及提示不明文洩露密鑰。",
          "expected": "憑證有合理遮罩；截圖避開任何真實憑證。",
          "actual": "憑證輸入框以圓點遮罩顯示內容；未見明文憑證。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-020_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "020_服務器空間",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-020_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-020_TC-003",
            "敏感資訊",
            "憑證顯示",
            "查看憑證輸入框是否遮罩；檢查頁面及提示不明文洩露密鑰。",
            "憑證有合理遮罩；截圖避開任何真實憑證。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-020_TC-004",
          "category": "測試邊界",
          "item": "連線與配置保存",
          "steps": "只查看測試連接及保存配置入口，不點提交、不改服務器配置。",
          "expected": "本輪禁止配置修改及真實外部操作，相關保存／連線實測記BLOCKED。",
          "actual": "按用例只檢查「測試連接」及「保存配置」入口；依本輪禁止實際連線或保存配置的邊界，未觸發操作。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-020_TC-004_BLOCKED.png\",\"查看原圖\")",
          "sheet": "020_服務器空間",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-020_TC-004_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-020_TC-004",
            "測試邊界",
            "連線與配置保存",
            "只查看測試連接及保存配置入口，不點提交、不改服務器配置。",
            "本輪禁止配置修改及真實外部操作，相關保存／連線實測記BLOCKED。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-020_TC-005",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以ADMIN登入，進入服務器空間；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "桌面尺寸下欄位與操作可見；390×645 窄屏下服務器配置卡片及按鈕可閱讀、可觸及，未見整頁裁切。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-020_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "020_服務器空間",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-020_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-020_TC-005",
            "品牌視覺",
            "品牌版版面與響應式",
            "以ADMIN登入，進入服務器空間；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-020",
        "服務器空間",
        "基礎設置",
        5,
        "=COUNTIF('020_服務器空間'!$G$2:$G$6,\"PASS\")",
        "=COUNTIF('020_服務器空間'!$G$2:$G$6,\"FAIL\")",
        "=COUNTIF('020_服務器空間'!$G$2:$G$6,\"BLOCKED\")",
        "=COUNTIF('020_服務器空間'!$G$2:$G$6,\"待确认\")",
        "=COUNTIF('020_服務器空間'!$G$2:$G$6,\"未执行\")",
        "=IF(F21>0,\"有失敗\",IF(G21>0,\"受阻\",IF(I21=D21,\"未执行\",IF(I21>0,\"部分執行\",IF(H21>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-021",
      "name": "Excel導入",
      "module": "基礎設置",
      "sheet": "021_Excel導入",
      "cases": [
        {
          "id": "PAGE-021_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→Excel導入」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-021_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以系統管理員進入「基礎設置→Excel 導入」；內容標題為 Excel 導入，但全局頁首仍顯示「字典管理」。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-028",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-001_FAIL.png\",\"查看原圖\")",
          "sheet": "021_Excel導入",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-001_FAIL.png"
          ],
          "baseline": [
            "PAGE-021_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→Excel導入」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-021_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-021_TC-002",
          "category": "類型",
          "item": "導入類型切換",
          "steps": "依次選客戶、工單、報價、發票、收款，查看模板欄位及歷史。",
          "expected": "說明和模板欄位隨類型切換，歷史記錄清晰。",
          "actual": "依次切換客戶、工單、報價、發票及收款類型；模板欄位隨所選類型更新，歷史記錄保持空狀態。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "021_Excel導入",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-021_TC-002",
            "類型",
            "導入類型切換",
            "依次選客戶、工單、報價、發票、收款，查看模板欄位及歷史。",
            "說明和模板欄位隨類型切換，歷史記錄清晰。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-021_TC-003",
          "category": "下載",
          "item": "模板下載",
          "steps": "下載一個模板至本輪中間目錄，打開查看首行欄位後關閉。",
          "expected": "下載成功且欄位與畫面模板說明一致。",
          "actual": "點擊「下載收款記錄模板」後只出現「模板已下載（模擬）」提示，未產生可開啟的模板檔案，因此無法核對下載文件首行。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-030",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-003_FAIL.png\",\"查看原圖\")",
          "sheet": "021_Excel導入",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-003_FAIL.png"
          ],
          "baseline": [
            "PAGE-021_TC-003",
            "下載",
            "模板下載",
            "下載一個模板至本輪中間目錄，打開查看首行欄位後關閉。",
            "下載成功且欄位與畫面模板說明一致。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-021_TC-004",
          "category": "檔案校驗",
          "item": "錯誤格式和超過10MB",
          "steps": "只選本機無敏感資訊的txt及超過10MB測試檔，觀察校驗；不提交導入。",
          "expected": "依畫面格式及10MB限制拒絕，錯誤提示明確；不產生導入記錄。",
          "actual": "選本機 10.5MB 隔離測試檔；頁面仍顯示 1 筆資料預覽，未按畫面所示 10MB 上限拒絕。純文字 .txt 由原生文件選擇器限制，無法選入；未執行導入。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-031",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-004_FAIL.png\",\"查看原圖\")",
          "sheet": "021_Excel導入",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-004_FAIL.png"
          ],
          "baseline": [
            "PAGE-021_TC-004",
            "檔案校驗",
            "錯誤格式和超過10MB",
            "只選本機無敏感資訊的txt及超過10MB測試檔，觀察校驗；不提交導入。",
            "依畫面格式及10MB限制拒絕，錯誤提示明確；不產生導入記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-021_TC-005",
          "category": "取消",
          "item": "選檔後取消",
          "steps": "選一份合規測試檔進入預覽後取消；查看列表和導入歷史。",
          "expected": "取消不導入資料，不新增成功記錄。",
          "actual": "選取合規本機測試檔進入預覽後按「取消」；預覽關閉，提示已取消，導入歷史仍為「暫無導入記錄」。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "021_Excel導入",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-021_TC-005",
            "取消",
            "選檔後取消",
            "選一份合規測試檔進入預覽後取消；查看列表和導入歷史。",
            "取消不導入資料，不新增成功記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-021_TC-006",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以ADMIN登入，進入Excel導入；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "在 390×645 視口下，導入類型與模板下載卡片仍並排；模板標題、按鈕及字段說明被右側裁切，無法完整查看。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-032",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-006_FAIL.png\",\"查看原圖\")",
          "sheet": "021_Excel導入",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-006_FAIL.png"
          ],
          "baseline": [
            "PAGE-021_TC-006",
            "品牌視覺",
            "品牌版版面與響應式",
            "以ADMIN登入，進入Excel導入；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-021",
        "Excel導入",
        "基礎設置",
        6,
        "=COUNTIF('021_Excel導入'!$G$2:$G$7,\"PASS\")",
        "=COUNTIF('021_Excel導入'!$G$2:$G$7,\"FAIL\")",
        "=COUNTIF('021_Excel導入'!$G$2:$G$7,\"BLOCKED\")",
        "=COUNTIF('021_Excel導入'!$G$2:$G$7,\"待确认\")",
        "=COUNTIF('021_Excel導入'!$G$2:$G$7,\"未执行\")",
        "=IF(F22>0,\"有失敗\",IF(G22>0,\"受阻\",IF(I22=D22,\"未执行\",IF(I22>0,\"部分執行\",IF(H22>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-022",
      "name": "組件庫",
      "module": "基礎設置",
      "sheet": "022_組件庫",
      "cases": [
        {
          "id": "PAGE-022_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→組件庫」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-022_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以管理員進入「基礎設置→組件庫」；頁面標題、組件分類與預覽區可顯示，捲動後仍可觸及內容。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-022_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "022_組件庫",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-022_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-022_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 ADMIN 身份登入隔離靜態原型；經「基礎設置→組件庫」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-022_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-022_TC-002",
          "category": "預覽",
          "item": "各組件分類",
          "steps": "依次切換可見分類，捲動檢查按鈕、表單、標籤及資料頁預覽。",
          "expected": "分類高亮和內容一致；文字與範例無溢出。",
          "actual": "切換「CALL視圖」分類；點擊及鍵盤操作後選取狀態仍停留在「客戶視圖」，CALL 視圖內容未切換。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-033",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-022_TC-002_FAIL.png\",\"查看原圖\")",
          "sheet": "022_組件庫",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-022_TC-002_FAIL.png"
          ],
          "baseline": [
            "PAGE-022_TC-002",
            "預覽",
            "各組件分類",
            "依次切換可見分類，捲動檢查按鈕、表單、標籤及資料頁預覽。",
            "分類高亮和內容一致；文字與範例無溢出。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-022_TC-003",
          "category": "交互",
          "item": "範例表格與篩選",
          "steps": "操作範例 CALL資料頁的分頁、篩選及按鈕，再回真實 CALL管理。",
          "expected": "範例有明確展示回饋，不意外改變真實業務記錄。",
          "actual": "在範例表格選擇「政府」篩選並點搜尋，表格仍顯示私人客戶；點第 2 頁仍留在第 1/2 頁；點「查看詳情」未打開詳情。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-034",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-022_TC-003_FAIL.png\",\"查看原圖\")",
          "sheet": "022_組件庫",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-022_TC-003_FAIL.png"
          ],
          "baseline": [
            "PAGE-022_TC-003",
            "交互",
            "範例表格與篩選",
            "操作範例 CALL資料頁的分頁、篩選及按鈕，再回真實 CALL管理。",
            "範例有明確展示回饋，不意外改變真實業務記錄。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-022_TC-004",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以ADMIN登入，進入組件庫；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "390×645 視口下組件範例卡片及篩選欄文字被裁切，部分操作內容超出可視區域。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-035",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-022_TC-004_FAIL.png\",\"查看原圖\")",
          "sheet": "022_組件庫",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-022_TC-004_FAIL.png"
          ],
          "baseline": [
            "PAGE-022_TC-004",
            "品牌視覺",
            "品牌版版面與響應式",
            "以ADMIN登入，進入組件庫；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-022",
        "組件庫",
        "基礎設置",
        4,
        "=COUNTIF('022_組件庫'!$G$2:$G$5,\"PASS\")",
        "=COUNTIF('022_組件庫'!$G$2:$G$5,\"FAIL\")",
        "=COUNTIF('022_組件庫'!$G$2:$G$5,\"BLOCKED\")",
        "=COUNTIF('022_組件庫'!$G$2:$G$5,\"待确认\")",
        "=COUNTIF('022_組件庫'!$G$2:$G$5,\"未执行\")",
        "=IF(F23>0,\"有失敗\",IF(G23>0,\"受阻\",IF(I23=D23,\"未执行\",IF(I23>0,\"部分執行\",IF(H23>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-023",
      "name": "師傅首頁",
      "module": "移動端",
      "sheet": "023_師傅首頁",
      "cases": [
        {
          "id": "PAGE-023_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 MASTER 身份登入隔離靜態原型；經「登入師傅→移動端→首頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-023_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以師傅角色「陳大文（EMP0008）」打開師傅首頁；標題、姓名、區域及今日工作卡片均可見。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-023_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "023_師傅首頁",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-023_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-023_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 MASTER 身份登入隔離靜態原型；經「登入師傅→移動端→首頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-023_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-023_TC-002",
          "category": "導航",
          "item": "任務入口",
          "steps": "點首頁任務卡及查看全部，再點底部首頁返回。",
          "expected": "進入師傅自己的 CALL列表；返回不遺留遮罩。",
          "actual": "點「最近完成」查看全部後進入 CALL 列表的已完成分組；點底部首頁返回，未遺留遮罩。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-023_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "023_師傅首頁",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-023_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-023_TC-002",
            "導航",
            "任務入口",
            "點首頁任務卡及查看全部，再點底部首頁返回。",
            "進入師傅自己的 CALL列表；返回不遺留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-023_TC-003",
          "category": "資料",
          "item": "待辦數量及身份",
          "steps": "核對姓名、待辦數量、狀態分組與列表。",
          "expected": "顯示當前師傅身份；卡片數與同範圍任務一致。",
          "actual": "核對陳大文身份、待辦狀態分組及數量；頁面顯示今日 0 項及各狀態 0，待確認、待處理、處理中分組均為空態。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-023_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "023_師傅首頁",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-023_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-023_TC-003",
            "資料",
            "待辦數量及身份",
            "核對姓名、待辦數量、狀態分組與列表。",
            "顯示當前師傅身份；卡片數與同範圍任務一致。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-023_TC-004",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以MASTER登入，進入師傅首頁；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "桌面及 390×645 視口下首頁的身分、任務卡與底部導航可讀可操作，未見整頁意外橫向溢出。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-023_TC-004_PASS_2.png\",\"查看原圖\")",
          "sheet": "023_師傅首頁",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-023_TC-004_PASS_2.png"
          ],
          "baseline": [
            "PAGE-023_TC-004",
            "品牌視覺",
            "品牌版版面與響應式",
            "以MASTER登入，進入師傅首頁；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-023",
        "師傅首頁",
        "移動端",
        4,
        "=COUNTIF('023_師傅首頁'!$G$2:$G$5,\"PASS\")",
        "=COUNTIF('023_師傅首頁'!$G$2:$G$5,\"FAIL\")",
        "=COUNTIF('023_師傅首頁'!$G$2:$G$5,\"BLOCKED\")",
        "=COUNTIF('023_師傅首頁'!$G$2:$G$5,\"待确认\")",
        "=COUNTIF('023_師傅首頁'!$G$2:$G$5,\"未执行\")",
        "=IF(F24>0,\"有失敗\",IF(G24>0,\"受阻\",IF(I24=D24,\"未执行\",IF(I24>0,\"部分執行\",IF(H24>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-024",
      "name": "師傅CALL",
      "module": "移動端",
      "sheet": "024_師傅CALL",
      "cases": [
        {
          "id": "PAGE-024_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 MASTER 身份登入隔離靜態原型；經「師傅移動端→CALL」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-024_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以師傅角色「周師傅（EMP0004）」進入移動端 CALL；標題、身份、狀態分類及 CALL 卡片可見。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-024_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "024_師傅CALL",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-024_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-024_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 MASTER 身份登入隔離靜態原型；經「師傅移動端→CALL」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-024_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-024_TC-002",
          "category": "狀態",
          "item": "任務狀態分組",
          "steps": "依次切換可見待處理、處理中、已完成等分類並捲動。",
          "expected": "分類與卡片狀態一致；無資料有空態。",
          "actual": "依次切換待確認、待處理、處理中、已完成；各分組選取狀態與可見 CALL 列表/空態一致。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-024_TC-002_PASS_1.png\",\"查看原圖\")",
          "sheet": "024_師傅CALL",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-024_TC-002_PASS_1.png"
          ],
          "baseline": [
            "PAGE-024_TC-002",
            "狀態",
            "任務狀態分組",
            "依次切換可見待處理、處理中、已完成等分類並捲動。",
            "分類與卡片狀態一致；無資料有空態。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-024_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉CALL詳情",
          "steps": "記下首筆編號與名稱；點擊CALL詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "打開 WO-DEMO-FIN-P-001 及 WO-20260612-011 詳情；基礎資料、處理記錄與報價分頁顯示對應編號及內容；關閉後回到可操作列表。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-024_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "024_師傅CALL",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-024_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-024_TC-003",
            "詳情抽屜",
            "開啟及關閉CALL詳情",
            "記下首筆編號與名稱；點擊CALL詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-024_TC-004",
          "category": "接單",
          "item": "收到及狀態回看",
          "steps": "選既有待確認本機樣例，點收到，再開同筆詳情並刷新。",
          "expected": "有明確回饋；任務狀態與詳情一致；不重複接單。",
          "actual": "在現有 WO-20260612-011 待確認 CALL 點「收到」；收到成功提示出現、該 CALL 移至待處理；重新打開詳情並刷新後重新登入，該 CALL 仍在待處理且詳情狀態一致。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-024_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "024_師傅CALL",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-024_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-024_TC-004",
            "接單",
            "收到及狀態回看",
            "選既有待確認本機樣例，點收到，再開同筆詳情並刷新。",
            "有明確回饋；任務狀態與詳情一致；不重複接單。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-024_TC-005",
          "category": "歷史",
          "item": "已完成任務查看",
          "steps": "切換已完成，開一筆詳情並檢查照片、服務資料和返回。",
          "expected": "歷史可讀；進入不自動重置為處理中。",
          "actual": "已完成 WO-DEMO-FIN-P-001 的狀態、處理方式及兩筆處理記錄可讀；附件只提供「停車場閘機完工照片.jpg」名稱，查看/下載按鈕停用且沒有文件連結，照片內容無法核驗。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-024_TC-005_BLOCKED.png\",\"查看原圖\")",
          "sheet": "024_師傅CALL",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-024_TC-005_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-024_TC-005",
            "歷史",
            "已完成任務查看",
            "切換已完成，開一筆詳情並檢查照片、服務資料和返回。",
            "歷史可讀；進入不自動重置為處理中。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-024_TC-006",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以MASTER登入，進入師傅CALL；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "桌面視口及 390×645 窄屏下 CALL 標題、分組切換、卡片欄位、詳情/報告操作及底部導航可見，未見內容被裁切。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-024_TC-006_PASS_NARROW.png\",\"查看原圖\")",
          "sheet": "024_師傅CALL",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-024_TC-006_PASS_NARROW.png"
          ],
          "baseline": [
            "PAGE-024_TC-006",
            "品牌視覺",
            "品牌版版面與響應式",
            "以MASTER登入，進入師傅CALL；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-024",
        "師傅CALL",
        "移動端",
        6,
        "=COUNTIF('024_師傅CALL'!$G$2:$G$7,\"PASS\")",
        "=COUNTIF('024_師傅CALL'!$G$2:$G$7,\"FAIL\")",
        "=COUNTIF('024_師傅CALL'!$G$2:$G$7,\"BLOCKED\")",
        "=COUNTIF('024_師傅CALL'!$G$2:$G$7,\"待确认\")",
        "=COUNTIF('024_師傅CALL'!$G$2:$G$7,\"未执行\")",
        "=IF(F25>0,\"有失敗\",IF(G25>0,\"受阻\",IF(I25=D25,\"未执行\",IF(I25>0,\"部分執行\",IF(H25>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-025",
      "name": "移動工單詳情",
      "module": "移動端",
      "sheet": "025_移動工單詳情",
      "cases": [
        {
          "id": "PAGE-025_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 MASTER 身份登入隔離靜態原型；經「師傅CALL→工單詳情（mobileDetail）；現場處理抽屜歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-025_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "周師傅 EMP0004 由移動端待處理列表開啟 WO-20260615-004 的現場處理抽屜；頁面標題、工單號及客戶卡片可見。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-025_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "025_移動工單詳情",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-025_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-025_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 MASTER 身份登入隔離靜態原型；經「師傅CALL→工單詳情（mobileDetail）；現場處理抽屜歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-025_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-025_TC-002",
          "category": "資料",
          "item": "工單資料與派工備註",
          "steps": "開既有任務，核對編號、客戶、電話、地址和派工備註。；舊版此獨立入口未找到，若新版仍不可達記錄阻塞，請勿強制呼叫內部函數。",
          "expected": "來源列表與詳情一致；派工備註完整可讀。",
          "actual": "列表卡片顯示 WO-20260615-004／新界住宅項目／3區／黃先生；點編號開詳情後同一編號卻顯示「香港政府大樓」及合約 1P2600004，客戶名稱與列表不一致。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-036",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-025_TC-002_FAIL.png\",\"查看原圖\")",
          "sheet": "025_移動工單詳情",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-025_TC-002_FAIL.png"
          ],
          "baseline": [
            "PAGE-025_TC-002",
            "資料",
            "工單資料與派工備註",
            "開既有任務，核對編號、客戶、電話、地址和派工備註。；舊版此獨立入口未找到，若新版仍不可達記錄阻塞，請勿強制呼叫內部函數。",
            "來源列表與詳情一致；派工備註完整可讀。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-025_TC-003",
          "category": "處理抽屜",
          "item": "開啟、關閉與再次開啟",
          "steps": "點開始／繼續處理，捲動抽屜後關閉再開。",
          "expected": "抽屜可完整開關；不出現雙重遮罩；原任務身份不變。",
          "actual": "關閉現場處理抽屜後回到同一任務卡，再點開始處理可重新開啟；任務號仍為 WO-20260615-004，沒有殘留雙重遮罩。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-025_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "025_移動工單詳情",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-025_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-025_TC-003",
            "處理抽屜",
            "開啟、關閉與再次開啟",
            "點開始／繼續處理，捲動抽屜後關閉再開。",
            "抽屜可完整開關；不出現雙重遮罩；原任務身份不變。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-025_TC-004",
          "category": "門檻",
          "item": "未打卡開始處理",
          "steps": "在未打卡既有任務開處理，嘗試直接前往服務中。",
          "expected": "未完成畫面標記必填項時不提前進入服務處理。",
          "actual": "未完成打卡時點「服務中」及「提交並開始處理」均無法越過必填打卡步驟，抽屜維持開始處理狀態。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-025_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "025_移動工單詳情",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-025_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-025_TC-004",
            "門檻",
            "未打卡開始處理",
            "在未打卡既有任務開處理，嘗試直接前往服務中。",
            "未完成畫面標記必填項時不提前進入服務處理。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-025_TC-005",
          "category": "本機保存",
          "item": "打卡與文字即時保存",
          "steps": "在隔離本機任務點打卡，加入示例Before照片，開始處理並填 QA-20261106 備註；關閉重開。",
          "expected": "打卡時間、Before照片及備註可回看；前後步驟狀態一致。",
          "actual": "對隔離樣例 WO-20260615-004 打卡、加入 Before 示例照片並填 QA-20261106；關閉重開後仍見處理記錄及 Before 照片，卡片轉為處理中。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-025_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "025_移動工單詳情",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-025_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-025_TC-005",
            "本機保存",
            "打卡與文字即時保存",
            "在隔離本機任務點打卡，加入示例Before照片，開始處理並填 QA-20261106 備註；關閉重開。",
            "打卡時間、Before照片及備註可回看；前後步驟狀態一致。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-025_TC-006",
          "category": "圖片",
          "item": "After照片與步驟切換",
          "steps": "加入示例After照片；進報告步驟再返回服務中並重開。",
          "expected": "圖片與原任務綁定且不遺失；無真實外部上傳。",
          "actual": "加入 After 示例照片後切至「維修完工紙」，再返回服務中；同一 WO-20260615-004 的 Before/After 照片及 QA 記錄仍可見，未提交完工紙或外部資料。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-025_TC-006_PASS.png\",\"查看原圖\")",
          "sheet": "025_移動工單詳情",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-025_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-025_TC-006",
            "圖片",
            "After照片與步驟切換",
            "加入示例After照片；進報告步驟再返回服務中並重開。",
            "圖片與原任務綁定且不遺失；無真實外部上傳。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-025_TC-007",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以MASTER登入，進入移動工單詳情；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "移動端窄視圖可讀；點「PC端」切換後跳至首頁，無法在同一工單詳情頁核對桌面與窄屏版面。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-025_TC-007_BLOCKED_MOBILE.png\",\"查看原圖\")",
          "sheet": "025_移動工單詳情",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-025_TC-007_BLOCKED_MOBILE.png"
          ],
          "baseline": [
            "PAGE-025_TC-007",
            "品牌視覺",
            "品牌版版面與響應式",
            "以MASTER登入，進入移動工單詳情；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-025",
        "移動工單詳情",
        "移動端",
        7,
        "=COUNTIF('025_移動工單詳情'!$G$2:$G$8,\"PASS\")",
        "=COUNTIF('025_移動工單詳情'!$G$2:$G$8,\"FAIL\")",
        "=COUNTIF('025_移動工單詳情'!$G$2:$G$8,\"BLOCKED\")",
        "=COUNTIF('025_移動工單詳情'!$G$2:$G$8,\"待确认\")",
        "=COUNTIF('025_移動工單詳情'!$G$2:$G$8,\"未执行\")",
        "=IF(F26>0,\"有失敗\",IF(G26>0,\"受阻\",IF(I26=D26,\"未执行\",IF(I26>0,\"部分執行\",IF(H26>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-026",
      "name": "移動SR填報",
      "module": "移動端",
      "sheet": "026_移動SR填報",
      "cases": [
        {
          "id": "PAGE-026_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 MASTER 身份登入隔離靜態原型；經「本機CALL處理→報告步驟；SR適用任務」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-026_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以周師傅 EMP0004 在已完成 P 樣例 WO-DEMO-FIN-P-001 點「編輯報告」；SR 報告頁標題、角色、報告圖片區及表單可見。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-026_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 MASTER 身份登入隔離靜態原型；經「本機CALL處理→報告步驟；SR適用任務」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-026_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-002",
          "category": "預填",
          "item": "SR基本資料",
          "steps": "開既有SR適用任務報告步驟，核對客戶、聯絡人、地址與關聯號。",
          "expected": "與任務來源一致，不混用CP欄位。",
          "actual": "SR 表單預填新界花園住宅、CUST-0003、張女士、+852 9345 6789、沙田第一城銀城街12號，與來源任務卡一致。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-026_TC-002",
            "預填",
            "SR基本資料",
            "開既有SR適用任務報告步驟，核對客戶、聯絡人、地址與關聯號。",
            "與任務來源一致，不混用CP欄位。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-003",
          "category": "圖片",
          "item": "示例服務報告圖片",
          "steps": "點加入示例圖片；預覽後關閉，再重開報告步驟。",
          "expected": "示例圖片可見且屬當前任務；不宣稱OCR真實辨識通過。",
          "actual": "加入示例服務報告圖片後縮圖顯示於 WO-DEMO-FIN-P-001 表單；關閉並重開報告後仍可見。縮圖點擊未出現獨立放大預覽；本用例預期只要求圖片可見。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-026_TC-003",
            "圖片",
            "示例服務報告圖片",
            "點加入示例圖片；預覽後關閉，再重開報告步驟。",
            "示例圖片可見且屬當前任務；不宣稱OCR真實辨識通過。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-004",
          "category": "必填校驗",
          "item": "空白報告提交",
          "steps": "清空帶星號欄位、簽名和必要照片後提交。",
          "expected": "缺少必填時阻止提交並提示，不顯示成功頁。",
          "actual": "空白必填資料狀態下點「完成並提交服務報告」兩次；表單仍留在原處，沒有可見必填提示、成功頁或錯誤回饋。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-037",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-004_FAIL.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-004_FAIL.png"
          ],
          "baseline": [
            "PAGE-026_TC-004",
            "必填校驗",
            "空白報告提交",
            "清空帶星號欄位、簽名和必要照片後提交。",
            "缺少必填時阻止提交並提示，不顯示成功頁。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-005",
          "category": "本機保存",
          "item": "填寫並回看",
          "steps": "填 QA-20261106 服務內容，操作系統多選和服務類型；離開重開。",
          "expected": "文字及選項保存一致，不影響其他任務。",
          "actual": "填 QA-20261106 完成工作及待跟進事項，選 Car Park、CCTV 和 Fault Report；關閉重開後文字與多選狀態均保留。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-026_TC-005",
            "本機保存",
            "填寫並回看",
            "填 QA-20261106 服務內容，操作系統多選和服務類型；離開重開。",
            "文字及選項保存一致，不影響其他任務。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-006",
          "category": "提交",
          "item": "本機樣例有效提交",
          "steps": "補齊所見必填、示例前後照片及測試簽名，提交一次。",
          "expected": "只更新本機樣例；顯示明確提交回饋，不能替代主管／CR業務驗收。",
          "actual": "為本機樣例補入 QA-20261106、文字、多選、示例報告圖片、兩項「否」及明確標示 QA 的測試簽名；點提交一次後仍停在表單，沒有成功或缺項回饋。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-037",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-006_FAIL.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-006_FAIL.png"
          ],
          "baseline": [
            "PAGE-026_TC-006",
            "提交",
            "本機樣例有效提交",
            "補齊所見必填、示例前後照片及測試簽名，提交一次。",
            "只更新本機樣例；顯示明確提交回饋，不能替代主管／CR業務驗收。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-007",
          "category": "待確認規則",
          "item": "SR號碼生成細則",
          "steps": "觀察手填及自動號碼提示，嘗試非數字並記錄；不自行決定七位加1規則。",
          "expected": "可觀察的格式校驗如實記錄；C-09發號政策記待確認。",
          "actual": "服務報告編號欄接受文字 QA-20261106，離開欄位後未顯示格式錯誤；畫面明示列印與發號規則尚待客戶確認，C-09 編號政策仍待確認。（本輪實測：2026-11-07）",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-007_PENDING.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-007_PENDING.png"
          ],
          "baseline": [
            "PAGE-026_TC-007",
            "待確認規則",
            "SR號碼生成細則",
            "觀察手填及自動號碼提示，嘗試非數字並記錄；不自行決定七位加1規則。",
            "可觀察的格式校驗如實記錄；C-09發號政策記待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-008",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以MASTER登入，進入移動SR填報；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "移動 SR 表單在原型移動端框架可見；本輪切換 PC 端會返回首頁，不能在同一表單的桌面視圖與 390×645 實際視口間核對。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-008_BLOCKED.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-008_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-026_TC-008",
            "品牌視覺",
            "品牌版版面與響應式",
            "以MASTER登入，進入移動SR填報；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-009",
          "category": "歷史BUG回歸",
          "item": "BUG-010 回歸",
          "steps": "在可用的處理中任務加入Before及After示例照片，點服務報告步驟。",
          "expected": "進入報告表單，若有未完成條件則明確提示。",
          "actual": "師傅處理中列表只有 M／保養維修的 WO-20260615-004；唯一可用 P（工程）SR 樣例 WO-DEMO-FIN-P-001 已完成，缺少進行中且適用 SR 的任務，未能按步驟回歸。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-009_BLOCKED.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 10,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-009_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-026_TC-009",
            "歷史BUG回歸",
            "BUG-010 回歸",
            "在可用的處理中任務加入Before及After示例照片，點服務報告步驟。",
            "進入報告表單，若有未完成條件則明確提示。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-026_TC-010",
          "category": "歷史BUG回歸",
          "item": "BUG-012 回歸",
          "steps": "已完成任務的SR編輯表單填必填資料及示例圖後提交。",
          "expected": "顯示成功結果或明確指出缺失項。",
          "actual": "已完成 P 樣例 SR 編輯表單點提交一次後未顯示成功或缺項原因；返回任務清單確認 WO-DEMO-FIN-P-001 仍標示已完成。用例標籤 BUG-012 與問題彙總既有「報價管理缺少編號搜尋」內容不符，本次未覆寫歷史 BUG-012。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-037",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-026_TC-010_FAIL.png\",\"查看原圖\")",
          "sheet": "026_移動SR填報",
          "row": 11,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-026_TC-010_FAIL.png"
          ],
          "baseline": [
            "PAGE-026_TC-010",
            "歷史BUG回歸",
            "BUG-012 回歸",
            "已完成任務的SR編輯表單填必填資料及示例圖後提交。",
            "顯示成功結果或明確指出缺失項。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-026",
        "移動SR填報",
        "移動端",
        10,
        "=COUNTIF('026_移動SR填報'!$G$2:$G$11,\"PASS\")",
        "=COUNTIF('026_移動SR填報'!$G$2:$G$11,\"FAIL\")",
        "=COUNTIF('026_移動SR填報'!$G$2:$G$11,\"BLOCKED\")",
        "=COUNTIF('026_移動SR填報'!$G$2:$G$11,\"待确认\")",
        "=COUNTIF('026_移動SR填報'!$G$2:$G$11,\"未执行\")",
        "=IF(F27>0,\"有失敗\",IF(G27>0,\"受阻\",IF(I27=D27,\"未执行\",IF(I27>0,\"部分執行\",IF(H27>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-027",
      "name": "移動CP填報",
      "module": "移動端",
      "sheet": "027_移動CP填報",
      "cases": [
        {
          "id": "PAGE-027_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 MASTER 身份登入隔離靜態原型；經「成交維修樣例→處理→完工紙」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-027_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以管理層 MASTER 對應帳號 EMP0000 進入移動首頁，顯示目前 0 項待跟進及暫無已完成任務；由工單／處理入口只到 ECA-20261107-001 與 SR 表單，未能按指定成交維修樣例開啟 CP 填報。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-027_TC-001_BLOCKED_3.png\",\"查看原圖\")",
          "sheet": "027_移動CP填報",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-027_TC-001_BLOCKED_3.png"
          ],
          "baseline": [
            "PAGE-027_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 MASTER 身份登入隔離靜態原型；經「成交維修樣例→處理→完工紙」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-027_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-027_TC-002",
          "category": "預填",
          "item": "成交維修清單",
          "steps": "開既有成交維修任務完工紙，核對報價號、版本、項目、規格、數量及單位。",
          "expected": "與所選成交版本一致；無清單顯示補充核對提示。",
          "actual": "查看已完成 CP-CP-DEMO-P-001／WO-DEMO-FIN-P-001 完工單詳情，只見報價參照 QT-DEMO-FIN-P-001、提示「未記錄成交維修清單，需補充核對」及既有圖片；沒有可編輯的成交清單、版本或項目欄位，因此無法按步驟檢查 CP 填報表。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-027_TC-002_BLOCKED.png\",\"查看原圖\")",
          "sheet": "027_移動CP填報",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-027_TC-002_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-027_TC-002",
            "預填",
            "成交維修清單",
            "開既有成交維修任務完工紙，核對報價號、版本、項目、規格、數量及單位。",
            "與所選成交版本一致；無清單顯示補充核對提示。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-027_TC-003",
          "category": "切換",
          "item": "電子及實體完工紙",
          "steps": "切換電子與實體類型，觀察簽名、圖片和提示，再切回。",
          "expected": "必填要求與所選類型一致，不殘留另一類型錯誤提示。",
          "actual": "CP 完工單詳情中沒有電子／實體完工紙類型切換；CP 填報表入口不可達，未能執行切換。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-027_TC-003_BLOCKED.png\",\"查看原圖\")",
          "sheet": "027_移動CP填報",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-027_TC-003_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-027_TC-003",
            "切換",
            "電子及實體完工紙",
            "切換電子與實體類型，觀察簽名、圖片和提示，再切回。",
            "必填要求與所選類型一致，不殘留另一類型錯誤提示。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-027_TC-004",
          "category": "必填校驗",
          "item": "CP編號格式",
          "steps": "依次輸入空白、12345、1234567、ABCDEF與123456，補其餘必填後嘗試提交。",
          "expected": "按畫面6位數字提示校驗；無效編號不得靜默當有效編號提交。",
          "actual": "可達頁面沒有 CP 編號輸入欄；未在 SR 編號欄代替測試，避免測錯欄位，CP 表單不可達。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-027_TC-004_BLOCKED.png\",\"查看原圖\")",
          "sheet": "027_移動CP填報",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-027_TC-004_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-027_TC-004",
            "必填校驗",
            "CP編號格式",
            "依次輸入空白、12345、1234567、ABCDEF與123456，補其餘必填後嘗試提交。",
            "按畫面6位數字提示校驗；無效編號不得靜默當有效編號提交。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-027_TC-005",
          "category": "圖片",
          "item": "示例完工單存檔",
          "steps": "加入示例完工單；關閉重開，檢查圖片及存檔時間。",
          "expected": "顯示圖片與存檔時間；本原型說明不做OCR，不以預設文字冒充識別結果。",
          "actual": "現有 CP 詳情只顯示既有檔名 demo-cp-p-001.jpg；無上傳／保存時間控制項，CP 填報表不可達，無法驗證加入示例完工單及重開保存。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-027_TC-002_BLOCKED.png\",\"查看原圖\")",
          "sheet": "027_移動CP填報",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-027_TC-002_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-027_TC-005",
            "圖片",
            "示例完工單存檔",
            "加入示例完工單；關閉重開，檢查圖片及存檔時間。",
            "顯示圖片與存檔時間；本原型說明不做OCR，不以預設文字冒充識別結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-027_TC-006",
          "category": "提交",
          "item": "提交交主管",
          "steps": "對隔離本機樣例補齊必填、測試簽名或實體示例後提交。",
          "expected": "提示交主管核對；師傅提交本身不冒充主管已確認完工。",
          "actual": "CP 表單與提交交主管操作不可達；本輪未提交 CP 或改動完工狀態。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-027_TC-002_BLOCKED.png\",\"查看原圖\")",
          "sheet": "027_移動CP填報",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-027_TC-002_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-027_TC-006",
            "提交",
            "提交交主管",
            "對隔離本機樣例補齊必填、測試簽名或實體示例後提交。",
            "提示交主管核對；師傅提交本身不冒充主管已確認完工。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-027_TC-007",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以MASTER登入，進入移動CP填報；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "從桌面報告頁切換移動端後進入師傅首頁，沒有同一 CP 填報頁可供跨版比較；MASTER 帳號首頁亦顯示沒有待跟進／已完成任務。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-027_TC-001_BLOCKED_2.png\",\"查看原圖\")",
          "sheet": "027_移動CP填報",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-027_TC-001_BLOCKED_2.png"
          ],
          "baseline": [
            "PAGE-027_TC-007",
            "品牌視覺",
            "品牌版版面與響應式",
            "以MASTER登入，進入移動CP填報；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-027_TC-008",
          "category": "歷史BUG回歸",
          "item": "BUG-011 回歸",
          "steps": "CP表單填12345，補齊其餘必填後嘗試提交。",
          "expected": "依畫面六位數格式提示拒絕五位編號。",
          "actual": "沒有 CP 編號欄可輸入五位編號；未改用 SR 編號欄模擬 CP 校驗，BUG-011 本輪無法驗證。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-027_TC-004_BLOCKED.png\",\"查看原圖\")",
          "sheet": "027_移動CP填報",
          "row": 9,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-027_TC-004_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-027_TC-008",
            "歷史BUG回歸",
            "BUG-011 回歸",
            "CP表單填12345，補齊其餘必填後嘗試提交。",
            "依畫面六位數格式提示拒絕五位編號。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-027",
        "移動CP填報",
        "移動端",
        8,
        "=COUNTIF('027_移動CP填報'!$G$2:$G$9,\"PASS\")",
        "=COUNTIF('027_移動CP填報'!$G$2:$G$9,\"FAIL\")",
        "=COUNTIF('027_移動CP填報'!$G$2:$G$9,\"BLOCKED\")",
        "=COUNTIF('027_移動CP填報'!$G$2:$G$9,\"待确认\")",
        "=COUNTIF('027_移動CP填報'!$G$2:$G$9,\"未执行\")",
        "=IF(F28>0,\"有失敗\",IF(G28>0,\"受阻\",IF(I28=D28,\"未执行\",IF(I28>0,\"部分執行\",IF(H28>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-028",
      "name": "移動提交成功",
      "module": "移動端",
      "sheet": "028_移動提交成功",
      "cases": [
        {
          "id": "PAGE-028_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 MASTER 身份登入隔離靜態原型；經「SR／CP有效提交後的成功狀態頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-028_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以周師傅進入已完成本機樣例 WO-DEMO-FIN-P-001 的 SR 表單並完成有效樣例資料；提交後仍停留「開始處理」抽屜，成功頁未載入，無法核對成功頁標題及角色。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-037",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-028_TC-001_FAIL.png\",\"查看原圖\")",
          "sheet": "028_移動提交成功",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-028_TC-001_FAIL.png"
          ],
          "baseline": [
            "PAGE-028_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 MASTER 身份登入隔離靜態原型；經「SR／CP有效提交後的成功狀態頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-028_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-028_TC-002",
          "category": "回饋",
          "item": "提交成功資料",
          "steps": "有效提交本機樣例後核對成功標題、原任務號及狀態。",
          "expected": "成功資訊屬於剛提交任務，不顯示其他任務結果。",
          "actual": "於已填妥的本機樣例 SR 表單點「完成並提交服務報告」一次；畫面仍停留表單，沒有成功標題、原任務號／狀態或錯誤回饋，未進入提交成功頁。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-037",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-028_TC-002_FAIL.png\",\"查看原圖\")",
          "sheet": "028_移動提交成功",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-028_TC-002_FAIL.png"
          ],
          "baseline": [
            "PAGE-028_TC-002",
            "回饋",
            "提交成功資料",
            "有效提交本機樣例後核對成功標題、原任務號及狀態。",
            "成功資訊屬於剛提交任務，不顯示其他任務結果。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-028_TC-003",
          "category": "導航",
          "item": "成功頁返回",
          "steps": "點成功頁返回入口，再打開剛提交任務。",
          "expected": "可返回任務列表並讀取提交結果，不因返回重複提交。",
          "actual": "沒有成功狀態頁或該頁返回入口；無法驗證返回後重開剛提交任務及防止重複提交。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "BUG-037",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-028_TC-001_FAIL.png\",\"查看原圖\")",
          "sheet": "028_移動提交成功",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-028_TC-001_FAIL.png"
          ],
          "baseline": [
            "PAGE-028_TC-003",
            "導航",
            "成功頁返回",
            "點成功頁返回入口，再打開剛提交任務。",
            "可返回任務列表並讀取提交結果，不因返回重複提交。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-028_TC-004",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以MASTER登入，進入移動提交成功；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "成功頁未載入，沒有同一成功頁可在桌面與窄屏比較；本項被提交後未顯示成功狀態所阻塞。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "BUG-037",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-028_TC-001_FAIL.png\",\"查看原圖\")",
          "sheet": "028_移動提交成功",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-028_TC-001_FAIL.png"
          ],
          "baseline": [
            "PAGE-028_TC-004",
            "品牌視覺",
            "品牌版版面與響應式",
            "以MASTER登入，進入移動提交成功；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-028",
        "移動提交成功",
        "移動端",
        4,
        "=COUNTIF('028_移動提交成功'!$G$2:$G$5,\"PASS\")",
        "=COUNTIF('028_移動提交成功'!$G$2:$G$5,\"FAIL\")",
        "=COUNTIF('028_移動提交成功'!$G$2:$G$5,\"BLOCKED\")",
        "=COUNTIF('028_移動提交成功'!$G$2:$G$5,\"待确认\")",
        "=COUNTIF('028_移動提交成功'!$G$2:$G$5,\"未执行\")",
        "=IF(F29>0,\"有失敗\",IF(G29>0,\"受阻\",IF(I29=D29,\"未执行\",IF(I29>0,\"部分執行\",IF(H29>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-029",
      "name": "主管移動首頁",
      "module": "移動端",
      "sheet": "029_主管移動首頁",
      "cases": [
        {
          "id": "PAGE-029_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 TL 身份登入隔離靜態原型；經「主管登入→移動端→首頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-029_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以李組長（TL／主管）帳號進入移動端首頁；核對頁面標題、登入身份、主要統計及優先任務；捲動至底部確認最後一張卡片及底部導航可達。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-029_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "029_主管移動首頁",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-029_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-029_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 TL 身份登入隔離靜態原型；經「主管登入→移動端→首頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-029_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-029_TC-002",
          "category": "統計",
          "item": "主管任務指標",
          "steps": "點各可操作指標及優先任務卡，核對目標狀態及編號。",
          "expected": "指標導向對應列表，優先任務開啟同一編號。",
          "actual": "依序點擊「待分派 2」「已分派 4」「可接單師傅 12」統計卡，再逐一點開優先跟進的 WO-20260615-002、WO-20260615-004、WO-20260612-011。待分派卡導向 2 張待分派清單、已分派卡導向 4 張清單；3 張優先任務詳情編號均與卡片相同。惟「可接單師傅 12」仍導向待分派 CALL 清單（2 張），沒有師傅名單。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-038",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-029_TC-002_FAIL.png\",\"查看原圖\")",
          "sheet": "029_主管移動首頁",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-029_TC-002_FAIL.png"
          ],
          "baseline": [
            "PAGE-029_TC-002",
            "統計",
            "主管任務指標",
            "點各可操作指標及優先任務卡，核對目標狀態及編號。",
            "指標導向對應列表，優先任務開啟同一編號。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-029_TC-003",
          "category": "角色",
          "item": "主管底部導航",
          "steps": "切換首頁、分派，再返回。",
          "expected": "當前選中標籤正確，顯示主管身份及主管可用入口。",
          "actual": "透過底部導航依序切換「首頁→分派→首頁」，每次核對標題、選中入口及主管身份。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-029_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "029_主管移動首頁",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-029_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-029_TC-003",
            "角色",
            "主管底部導航",
            "切換首頁、分派，再返回。",
            "當前選中標籤正確，顯示主管身份及主管可用入口。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-029_TC-004",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以TL登入，進入主管移動首頁；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "先在桌面視口檢查主管首頁，再使用 Chrome 響應式視口設為 390×645，核對標題、統計卡、優先工單及底部導航；捲動到底查看所有工單卡片。兩種寬度下內容可讀、主要操作可觸及，窄屏沒有明顯橫向溢出或底部遮擋。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-029_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "029_主管移動首頁",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-029_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-029_TC-004",
            "品牌視覺",
            "品牌版版面與響應式",
            "以TL登入，進入主管移動首頁；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-029",
        "主管移動首頁",
        "移動端",
        4,
        "=COUNTIF('029_主管移動首頁'!$G$2:$G$5,\"PASS\")",
        "=COUNTIF('029_主管移動首頁'!$G$2:$G$5,\"FAIL\")",
        "=COUNTIF('029_主管移動首頁'!$G$2:$G$5,\"BLOCKED\")",
        "=COUNTIF('029_主管移動首頁'!$G$2:$G$5,\"待确认\")",
        "=COUNTIF('029_主管移動首頁'!$G$2:$G$5,\"未执行\")",
        "=IF(F30>0,\"有失敗\",IF(G30>0,\"受阻\",IF(I30=D30,\"未执行\",IF(I30>0,\"部分執行\",IF(H30>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-030",
      "name": "主管移動分派",
      "module": "移動端",
      "sheet": "030_主管移動分派",
      "cases": [
        {
          "id": "PAGE-030_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 TL 身份登入隔離靜態原型；經「主管移動端→分派；派工抽屜歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-030_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以李組長（TL／主管）身份透過底部「分派」進入頁面；核對標題、身份、待分派／已分派數量、篩選區及工單卡片；確認清單可捲動。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "030_主管移動分派",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-030_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 TL 身份登入隔離靜態原型；經「主管移動端→分派；派工抽屜歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-030_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-030_TC-002",
          "category": "列表",
          "item": "主管任務狀態切換",
          "steps": "切換待分派、已分派等可見狀態，點任務開抽屜。",
          "expected": "列表狀態與抽屜編號一致。",
          "actual": "切換待分派與已分派狀態，核對列表筆數；點擊待分派 WO-20260615-001，分派抽屜標題及副標題均顯示相同編號。再切換已分派，點擊第一張 WO-20260615-004 卡片；畫面未開抽屜或改變狀態。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-041",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-002_FAIL.png\",\"查看原圖\")",
          "sheet": "030_主管移動分派",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-002_FAIL.png"
          ],
          "baseline": [
            "PAGE-030_TC-002",
            "列表",
            "主管任務狀態切換",
            "切換待分派、已分派等可見狀態，點任務開抽屜。",
            "列表狀態與抽屜編號一致。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-030_TC-003",
          "category": "校驗",
          "item": "未選師傅確認",
          "steps": "在可派工既有樣例開抽屜，不選師傅點確認。",
          "expected": "阻止空師傅提交並顯示提示。",
          "actual": "在待分派工單 WO-20260615-001 打開派工抽屜，不選師傅直接點「確認分派」。按鈕保持禁用，點擊後沒有提示、Toast 或錯誤說明，不能確認所需欄位。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-039",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-003_FAIL.png\",\"查看原圖\")",
          "sheet": "030_主管移動分派",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-003_FAIL.png"
          ],
          "baseline": [
            "PAGE-030_TC-003",
            "校驗",
            "未選師傅確認",
            "在可派工既有樣例開抽屜，不選師傅點確認。",
            "阻止空師傅提交並顯示提示。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-030_TC-004",
          "category": "派工",
          "item": "選師傅與備註保存",
          "steps": "選可派工本機樣例，選師傅填 QA-20261106 電話約定時間並確認；重開。",
          "expected": "師傅及備註保存可回看，提示與列表狀態一致。",
          "actual": "以待分派本機樣例 WO-20260615-001 打開派工抽屜，選可接單趙師傅，填寫「QA-20261106 電話約定時間」並確認；關閉後重開同一工單核對。首次確認轉到「任務處理」抽屜，沒有成功提示；返回後列表仍為待分派，重開的派工抽屜未保留師傅或備註。操作僅在隔離本機 Mock，沒有外部寫入。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-040",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-004_FAIL.png\",\"查看原圖\")",
          "sheet": "030_主管移動分派",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-004_FAIL.png"
          ],
          "baseline": [
            "PAGE-030_TC-004",
            "派工",
            "選師傅與備註保存",
            "選可派工本機樣例，選師傅填 QA-20261106 電話約定時間並確認；重開。",
            "師傅及備註保存可回看，提示與列表狀態一致。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-030_TC-005",
          "category": "材料門檻",
          "item": "未備齊不派工",
          "steps": "查看未備齊材料既有樣例，觀察禁用及提示；不連倉庫通。",
          "expected": "未備齊原因可見且不繞過首次施工派工門檻。",
          "actual": "檢查當前待分派本機樣例及頁面篩選，尋找未備齊材料工單；現有兩筆待分派工單沒有材料狀態資訊，篩選僅含區域、客戶及 CALL 類型。未連接倉庫通，也未嘗試繞過材料門檻。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-005_BLOCKED.png\",\"查看原圖\")",
          "sheet": "030_主管移動分派",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-005_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-030_TC-005",
            "材料門檻",
            "未備齊不派工",
            "查看未備齊材料既有樣例，觀察禁用及提示；不連倉庫通。",
            "未備齊原因可見且不繞過首次施工派工門檻。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-030_TC-006",
          "category": "彈窗取消",
          "item": "派工抽屜開啟與取消",
          "steps": "點擊「派工抽屜」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "打開 WO-20260615-001 派工抽屜，在師傅搜尋欄輸入「QA-20261106-CANCEL」後關閉；返回列表核對原工單仍待分派、筆數不變且遮罩已消失。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-006_PASS.png\",\"查看原圖\")",
          "sheet": "030_主管移動分派",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-030_TC-006",
            "彈窗取消",
            "派工抽屜開啟與取消",
            "點擊「派工抽屜」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-030_TC-007",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以TL登入，進入主管移動分派；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "先檢查桌面視口，再使用 Chrome 響應式視口設為 390×645；核對標題、狀態切換、區域／客戶／類型篩選、工單卡片及底部導航；捲動後所有工單仍可見，沒有明顯橫向溢出。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-007_PASS.png\",\"查看原圖\")",
          "sheet": "030_主管移動分派",
          "row": 8,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-007_PASS.png"
          ],
          "baseline": [
            "PAGE-030_TC-007",
            "品牌視覺",
            "品牌版版面與響應式",
            "以TL登入，進入主管移動分派；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-030",
        "主管移動分派",
        "移動端",
        7,
        "=COUNTIF('030_主管移動分派'!$G$2:$G$8,\"PASS\")",
        "=COUNTIF('030_主管移動分派'!$G$2:$G$8,\"FAIL\")",
        "=COUNTIF('030_主管移動分派'!$G$2:$G$8,\"BLOCKED\")",
        "=COUNTIF('030_主管移動分派'!$G$2:$G$8,\"待确认\")",
        "=COUNTIF('030_主管移動分派'!$G$2:$G$8,\"未执行\")",
        "=IF(F31>0,\"有失敗\",IF(G31>0,\"受阻\",IF(I31=D31,\"未执行\",IF(I31>0,\"部分執行\",IF(H31>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-031",
      "name": "CR移動首頁",
      "module": "移動端",
      "sheet": "031_CR移動首頁",
      "cases": [
        {
          "id": "PAGE-031_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 CR 身份登入隔離靜態原型；經「CR登入→移動端→首頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-031_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以 QA Luna Local 20261107（CR／2區）身份進入「移動端→首頁」；核對頁面標題、登入身份、區域 CALL 統計及優先跟進卡片；查看底部導航。實際顯示 2區，區域 CALL 3 張、待分派 1、處理中 1，兩張優先卡可見。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-031_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "031_CR移動首頁",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-031_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-031_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 CR 身份登入隔離靜態原型；經「CR登入→移動端→首頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-031_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-031_TC-002",
          "category": "指標",
          "item": "區域指標與任務入口",
          "steps": "點各區域任務指標及一張CALL卡片，再返回。",
          "expected": "指標與區域任務對應，卡片詳情編號一致。",
          "actual": "依次點擊區域 CALL 3、待分派 1、處理中 1，再打開 WO-20260615-002 卡片。總量入口顯示 2區 3 張；待分派入口顯示 1 張待分派；處理中入口回到區域 CALL 全量 3 張，未套用處理中篩選；卡片打開「分派 CALL」抽屜，編號一致。由於目前未找到已確認的指標跳轉規則，結果待確認。（本輪實測：2026-11-07）",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-031_TC-002_WAIT_CONFIRM.png\",\"查看原圖\")",
          "sheet": "031_CR移動首頁",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-031_TC-002_WAIT_CONFIRM.png"
          ],
          "baseline": [
            "PAGE-031_TC-002",
            "指標",
            "區域指標與任務入口",
            "點各區域任務指標及一張CALL卡片，再返回。",
            "指標與區域任務對應，卡片詳情編號一致。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-031_TC-003",
          "category": "角色",
          "item": "CR工作台導航",
          "steps": "依次點首頁、CALL、分派、報告，再返回首頁。",
          "expected": "當前標籤與內容一致，身份保持CR。",
          "actual": "依次點擊底部首頁→CALL→分派→報告→首頁；每次核對標題及可見內容，並確認頂部身份維持 QA Luna Local 20261107（CR）。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-031_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "031_CR移動首頁",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-031_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-031_TC-003",
            "角色",
            "CR工作台導航",
            "依次點首頁、CALL、分派、報告，再返回首頁。",
            "當前標籤與內容一致，身份保持CR。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-031_TC-004",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以CR登入，進入CR移動首頁；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "在桌面瀏覽器視口及 Chrome 響應式 390×645 視口檢查 CR 首頁標題、統計、優先任務和底部導航。兩個視口的文字與主要操作均可見，窄屏無明顯橫向溢出。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-031_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "031_CR移動首頁",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-031_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-031_TC-004",
            "品牌視覺",
            "品牌版版面與響應式",
            "以CR登入，進入CR移動首頁；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-031",
        "CR移動首頁",
        "移動端",
        4,
        "=COUNTIF('031_CR移動首頁'!$G$2:$G$5,\"PASS\")",
        "=COUNTIF('031_CR移動首頁'!$G$2:$G$5,\"FAIL\")",
        "=COUNTIF('031_CR移動首頁'!$G$2:$G$5,\"BLOCKED\")",
        "=COUNTIF('031_CR移動首頁'!$G$2:$G$5,\"待确认\")",
        "=COUNTIF('031_CR移動首頁'!$G$2:$G$5,\"未执行\")",
        "=IF(F32>0,\"有失敗\",IF(G32>0,\"受阻\",IF(I32=D32,\"未执行\",IF(I32>0,\"部分執行\",IF(H32>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-032",
      "name": "CR移動區域CALL",
      "module": "移動端",
      "sheet": "032_CR移動區域CALL",
      "cases": [
        {
          "id": "PAGE-032_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 CR 身份登入隔離靜態原型；經「CR移動端→CALL」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-032_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以 CR 身份進入「移動端→CALL」；核對標題、身份、所屬區域、列表數量、狀態及類型篩選和底部導航。2區帳號顯示 3 張區域 CALL。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-032_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "032_CR移動區域CALL",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-032_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-032_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 CR 身份登入隔離靜態原型；經「CR移動端→CALL」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-032_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-032_TC-002",
          "category": "列表",
          "item": "區域任務狀態",
          "steps": "切換可見狀態分類；記錄區域與樣例。",
          "expected": "分類和卡片狀態一致；無資料有空態。",
          "actual": "切換 CALL 狀態分類並核對列表筆數及卡片狀態。先選「待處理」顯示 1 張 WO-20260612-011；再選「已完成」顯示 1 張 WO-20260613-009，卡片狀態標籤一致。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-032_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "032_CR移動區域CALL",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-032_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-032_TC-002",
            "列表",
            "區域任務狀態",
            "切換可見狀態分類；記錄區域與樣例。",
            "分類和卡片狀態一致；無資料有空態。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-032_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉CALL詳情",
          "steps": "記下首筆編號與名稱；點擊CALL詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "記錄「已完成」列表首筆 WO-20260613-009 來源列客戶為「安全監控管理有限公司」；打開詳情，查看基礎資料、處理記錄、報價分頁，再關閉返回列表。詳情編號相同，但詳情客戶顯示「新界花園住宅」，與來源列不同；其餘分頁可切換，關閉後篩選列表仍可操作。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-042",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-032_TC-003_FAIL.png\",\"查看原圖\")",
          "sheet": "032_CR移動區域CALL",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-032_TC-003_FAIL.png"
          ],
          "baseline": [
            "PAGE-032_TC-003",
            "詳情抽屜",
            "開啟及關閉CALL詳情",
            "記下首筆編號與名稱；點擊CALL詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-032_TC-004",
          "category": "角色範圍",
          "item": "區域讀取限制",
          "steps": "以兩名不同區域CR依次登入，查看相同樣例是否可見。",
          "expected": "記錄實際範圍；完整權限矩陣未決部分記待確認，不以UI替代後端授權驗證。",
          "actual": "先以 QA Luna Local 20261107（2區）查看區域 CALL，再切換到陳關係（1區）查看；2區帳號顯示 3 張，1區帳號在已完成篩選下顯示 2 張，原 2區樣例 WO-20260613-009 不在 1區列表。頁面可見範圍有區域差異；但未驗證後端授權，權限矩陣仍待確認。（本輪實測：2026-11-07）",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-032_TC-004_WAIT_CONFIRM.png\",\"查看原圖\")",
          "sheet": "032_CR移動區域CALL",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-032_TC-004_WAIT_CONFIRM.png"
          ],
          "baseline": [
            "PAGE-032_TC-004",
            "角色範圍",
            "區域讀取限制",
            "以兩名不同區域CR依次登入，查看相同樣例是否可見。",
            "記錄實際範圍；完整權限矩陣未決部分記待確認，不以UI替代後端授權驗證。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-032_TC-005",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以CR登入，進入CR移動區域CALL；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "在桌面視口檢查 CALL 頁面正常；Chrome 響應式設為 390×645 後，頁面標題、狀態、卡片和底部導航可見，但「CALL 類型」篩選器延伸至窄屏右側邊界外，右側控制內容被截斷。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-043",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-032_TC-005_FAIL.png\",\"查看原圖\")",
          "sheet": "032_CR移動區域CALL",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-032_TC-005_FAIL.png"
          ],
          "baseline": [
            "PAGE-032_TC-005",
            "品牌視覺",
            "品牌版版面與響應式",
            "以CR登入，進入CR移動區域CALL；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-032",
        "CR移動區域CALL",
        "移動端",
        5,
        "=COUNTIF('032_CR移動區域CALL'!$G$2:$G$6,\"PASS\")",
        "=COUNTIF('032_CR移動區域CALL'!$G$2:$G$6,\"FAIL\")",
        "=COUNTIF('032_CR移動區域CALL'!$G$2:$G$6,\"BLOCKED\")",
        "=COUNTIF('032_CR移動區域CALL'!$G$2:$G$6,\"待确认\")",
        "=COUNTIF('032_CR移動區域CALL'!$G$2:$G$6,\"未执行\")",
        "=IF(F33>0,\"有失敗\",IF(G33>0,\"受阻\",IF(I33=D33,\"未执行\",IF(I33>0,\"部分執行\",IF(H33>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-033",
      "name": "CR移動分派",
      "module": "移動端",
      "sheet": "033_CR移動分派",
      "cases": [
        {
          "id": "PAGE-033_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 CR 身份登入隔離靜態原型；經「CR移動端→分派」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-033_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以 CR 身份登入隔離原型並由「移動端→分派」進入。頁面標題為「分派中心」，身份為陳關係（客戶關係部），1區顯示待分派6張、已分派2張；捲動至列表底部可查看末列及固定底部導航。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-033_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "033_CR移動分派",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-033_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-033_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 CR 身份登入隔離靜態原型；經「CR移動端→分派」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-033_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-033_TC-002",
          "category": "列表",
          "item": "分派進度狀態",
          "steps": "逐一切換可見狀態，核對任務卡編號與處理進度。",
          "expected": "狀態分類一致；未派工及已派工可區分。",
          "actual": "切換「待分派」與「已分派」：待分派顯示6張；已分派顯示2張，卡片WO-20260615-005及WO-20260613-010標記「處理中」。兩種狀態可切換，列表數量及標籤相符。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-033_TC-002_PASS.png\",\"查看原圖\")",
          "sheet": "033_CR移動分派",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-033_TC-002_PASS.png"
          ],
          "baseline": [
            "PAGE-033_TC-002",
            "列表",
            "分派進度狀態",
            "逐一切換可見狀態，核對任務卡編號與處理進度。",
            "狀態分類一致；未派工及已派工可區分。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-033_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉分派任務詳情",
          "steps": "記下首筆編號與名稱；點擊分派任務詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "打開首筆待分派卡ECA-20261107-001。詳情標題及香港政府大樓與來源列一致，顯示M（保養）、1區及師傅選擇清單；詳情沒有分頁。捲動可查看四名師傅及固定確認區；未選師傅時「確認分派」禁用。關閉後列表仍可操作。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-033_TC-003_PASS.png\",\"查看原圖\")",
          "sheet": "033_CR移動分派",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-033_TC-003_PASS.png"
          ],
          "baseline": [
            "PAGE-033_TC-003",
            "詳情抽屜",
            "開啟及關閉分派任務詳情",
            "記下首筆編號與名稱；點擊分派任務詳情；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-033_TC-004",
          "category": "角色操作",
          "item": "CR可見操作",
          "steps": "開已有不同狀態任務，記錄分派及只讀按鈕，關閉。",
          "expected": "無意外修改；CR與主管職責尚未批准的差異記待確認。",
          "actual": "CR可見操作為打開待分派卡後的師傅搜尋、狀態篩選及師傅選擇；未選師傅時確認分派按鈕禁用。未觸發分派。CR與主管權責差異尚未確認，依基線保留待確認。（本輪實測：2026-11-07）",
          "result": "待确认",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-033_TC-004_WAIT_CONFIRM.png\",\"查看原圖\")",
          "sheet": "033_CR移動分派",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-033_TC-004_WAIT_CONFIRM.png"
          ],
          "baseline": [
            "PAGE-033_TC-004",
            "角色操作",
            "CR可見操作",
            "開已有不同狀態任務，記錄分派及只讀按鈕，關閉。",
            "無意外修改；CR與主管職責尚未批准的差異記待確認。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-033_TC-005",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以CR登入，進入CR移動分派；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "在寬屏與390×645窄屏檢查CR移動分派。標題、身份、待分派／已分派、區域／客戶／CALL類型篩選、卡片及底部導航可讀；窄屏可捲動查看卡片，未見整頁非預期橫向溢出。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-033_TC-005_PASS.png\",\"查看原圖\")",
          "sheet": "033_CR移動分派",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-033_TC-005_PASS.png"
          ],
          "baseline": [
            "PAGE-033_TC-005",
            "品牌視覺",
            "品牌版版面與響應式",
            "以CR登入，進入CR移動分派；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-033",
        "CR移動分派",
        "移動端",
        5,
        "=COUNTIF('033_CR移動分派'!$G$2:$G$6,\"PASS\")",
        "=COUNTIF('033_CR移動分派'!$G$2:$G$6,\"FAIL\")",
        "=COUNTIF('033_CR移動分派'!$G$2:$G$6,\"BLOCKED\")",
        "=COUNTIF('033_CR移動分派'!$G$2:$G$6,\"待确认\")",
        "=COUNTIF('033_CR移動分派'!$G$2:$G$6,\"未执行\")",
        "=IF(F34>0,\"有失敗\",IF(G34>0,\"受阻\",IF(I34=D34,\"未执行\",IF(I34>0,\"部分執行\",IF(H34>0,\"待確認\",\"已完成\")))))"
      ]
    },
    {
      "id": "PAGE-034",
      "name": "CR移動客戶報告",
      "module": "移動端",
      "sheet": "034_CR移動客戶報告",
      "cases": [
        {
          "id": "PAGE-034_TC-001",
          "category": "頁面載入",
          "item": "入口、身份及整體版面",
          "steps": "以 CR 身份登入隔離靜態原型；經「CR移動端→報告；報告詳情歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-034_頁面概覽.png。",
          "expected": "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
          "actual": "以CR身份進入「移動端→報告」。頁面標題與身份正確，初始列表顯示3份報告，狀態包含已完成及處理中；捲動至底部可查看末筆報告與底部導航。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-034_TC-001_PASS.png\",\"查看原圖\")",
          "sheet": "034_CR移動客戶報告",
          "row": 2,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-034_TC-001_PASS.png"
          ],
          "baseline": [
            "PAGE-034_TC-001",
            "頁面載入",
            "入口、身份及整體版面",
            "以 CR 身份登入隔離靜態原型；經「CR移動端→報告；報告詳情歸本頁」進入；核對頁面標題、身份、主要區塊；捲動到底並保存 PAGE-034_頁面概覽.png。",
            "頁面成功顯示且身份正確；標題、主要欄位與操作可閱讀；捲動可觸及底部；保存真實整體截圖。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-034_TC-002",
          "category": "列表",
          "item": "待確認與歷史報告",
          "steps": "切換待確認及已完成等可見分類，開一筆報告。",
          "expected": "報告分類與狀態一致，空態清楚。",
          "actual": "初始列表可見SR-250315且狀態為已完成。依搜尋框提示輸入該報告編號後，頁面顯示共0份及「暫無符合條件的報告」；清除搜尋後恢復3份列表。報告編號搜尋無法找到清單中已顯示的同一筆記錄。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-044",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-034_TC-002_FAIL.png\",\"查看原圖\")",
          "sheet": "034_CR移動客戶報告",
          "row": 3,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-034_TC-002_FAIL.png"
          ],
          "baseline": [
            "PAGE-034_TC-002",
            "列表",
            "待確認與歷史報告",
            "切換待確認及已完成等可見分類，開一筆報告。",
            "報告分類與狀態一致，空態清楚。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-034_TC-003",
          "category": "詳情抽屜",
          "item": "開啟及關閉客戶報告",
          "steps": "記下首筆編號與名稱；點擊客戶報告；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
          "expected": "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
          "actual": "從列表首筆CP-CP-DEMO-MP-001（維多利亞酒店）點擊「查看報告」。詳情狀態與客戶、工單WO-DEMO-FIN-MP-001相符，描述內容可讀且可捲至報告操作區；但詳情主標題只顯示「SR」，未顯示來源列CP-CP-DEMO-MP-001，無法核對來源報告編號。點擊返回後恢復3份列表。（本輪實測：2026-11-07）",
          "result": "FAIL",
          "bugId": "BUG-045",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-034_TC-003_FAIL.png\",\"查看原圖\")",
          "sheet": "034_CR移動客戶報告",
          "row": 4,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-034_TC-003_FAIL.png"
          ],
          "baseline": [
            "PAGE-034_TC-003",
            "詳情抽屜",
            "開啟及關閉客戶報告",
            "記下首筆編號與名稱；點擊客戶報告；逐一切換可見分頁並捲動到底；用關閉按鈕返回。",
            "詳情編號及名稱與來源列一致；分頁資料無串單；底部操作可見；關閉後列表可操作。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-034_TC-004",
          "category": "角色操作",
          "item": "CP確認職責",
          "steps": "查看CP及SR樣例的確認入口，不跨角色代確認。",
          "expected": "成交維修CP交指定主管核對；若CR顯示可代主管直接確認，保留實際證據再判定。",
          "actual": "檢視CP完工單及SR-250412服務報告詳情。CR可見的操作為Email發送SR、WhatsApp發送SR及查看完整工單；沒有CP／SR確認或主管核對按鈕。未觸發外部發送或跨角色確認。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-034_TC-004_PASS.png\",\"查看原圖\")",
          "sheet": "034_CR移動客戶報告",
          "row": 5,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-034_TC-004_PASS.png"
          ],
          "baseline": [
            "PAGE-034_TC-004",
            "角色操作",
            "CP確認職責",
            "查看CP及SR樣例的確認入口，不跨角色代確認。",
            "成交維修CP交指定主管核對；若CR顯示可代主管直接確認，保留實際證據再判定。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-034_TC-005",
          "category": "彈窗取消",
          "item": "退回／補充資料開啟與取消",
          "steps": "點擊「退回／補充資料」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
          "expected": "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
          "actual": "檢查現有CR報告列表及SR-250412詳情：列表僅有已完成與處理中記錄，詳情僅提供Email／WhatsApp發送及查看完整工單；沒有待確認記錄或「退回／補充資料」入口。因彈窗操作的目標入口及符合狀態的前置記錄不存在，未輸入取消測試字串，記為BLOCKED。（本輪實測：2026-11-07）",
          "result": "BLOCKED",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-034_TC-005_BLOCKED.png\",\"查看原圖\")",
          "sheet": "034_CR移動客戶報告",
          "row": 6,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-034_TC-005_BLOCKED.png"
          ],
          "baseline": [
            "PAGE-034_TC-005",
            "彈窗取消",
            "退回／補充資料開啟與取消",
            "點擊「退回／補充資料」；輸入 QA-20261106-CANCEL；點擊取消或關閉；重新開啟並檢查列表。",
            "彈窗可完整顯示及關閉；取消不新增或變更原記錄；不殘留遮罩。",
            "",
            "未执行",
            "",
            ""
          ]
        },
        {
          "id": "PAGE-034_TC-006",
          "category": "品牌視覺",
          "item": "品牌版版面與響應式",
          "steps": "以CR登入，進入CR移動客戶報告；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
          "expected": "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
          "actual": "桌面視口下檢查報告列表、報告詳情及底部操作；再以390×645窄屏檢查報告卡。標題、身份、狀態、客戶及工單文字可讀，卡片操作在捲動後可觸及，固定底部導航可用，未見整頁非預期橫向溢出。（本輪實測：2026-11-07）",
          "result": "PASS",
          "bugId": "",
          "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-034_TC-006_PASS.png\",\"查看原圖\")",
          "sheet": "034_CR移動客戶報告",
          "row": 7,
          "screenshots": [
            "outputs/2026-11-07-luna-qa/screenshots/PAGE-034_TC-006_PASS.png"
          ],
          "baseline": [
            "PAGE-034_TC-006",
            "品牌視覺",
            "品牌版版面與響應式",
            "以CR登入，進入CR移動客戶報告；分別在桌面與窄屏檢查標題、導航、可見欄位及主要操作，必要時捲動。",
            "文字可讀，重要操作可觸及，沒有遮擋或整頁意外橫向溢出；配色變更本身不判BUG。",
            "",
            "未执行",
            "",
            ""
          ]
        }
      ],
      "sourceOverview": [
        "PAGE-034",
        "CR移動客戶報告",
        "移動端",
        6,
        "=COUNTIF('034_CR移動客戶報告'!$G$2:$G$7,\"PASS\")",
        "=COUNTIF('034_CR移動客戶報告'!$G$2:$G$7,\"FAIL\")",
        "=COUNTIF('034_CR移動客戶報告'!$G$2:$G$7,\"BLOCKED\")",
        "=COUNTIF('034_CR移動客戶報告'!$G$2:$G$7,\"待确认\")",
        "=COUNTIF('034_CR移動客戶報告'!$G$2:$G$7,\"未执行\")",
        "=IF(F35>0,\"有失敗\",IF(G35>0,\"受阻\",IF(I35=D35,\"未执行\",IF(I35>0,\"部分執行\",IF(H35>0,\"待確認\",\"已完成\")))))"
      ]
    }
  ],
  "issues": [
    {
      "id": "BUG-004",
      "pageId": "PAGE-002",
      "pageName": "PC首頁",
      "caseId": "PAGE-002_TC-002",
      "description": "「待審批」計數為0，但卡片仍顯示查看入口；點擊後無任何明細、空狀態或提示回饋。",
      "steps": "ADMIN 登入 → 首頁 → 點擊「待審批 0／點擊列表篩選查看」。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-002_TC-002_PASS_APPROVAL_ZERO_20261108.png\",\"查看回歸圖\")",
      "status": "已修復（回歸 PASS）",
      "expectedActual": "預期：點擊卡片打開對應明細或明確空狀態。首次執行（2026-11-07）：點擊「待審批 0」無任何反應（FAIL）。修改後回歸（2026-11-08，隔離本機原型，以 ADMIN 林主管登入）：打開「待審批 CALL」彈窗並顯示「暫無對應 CALL」（PASS）。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-002_FAIL_APPROVAL_NO_ACTION.png"
      ],
      "sheet": "01_問題彙總",
      "row": 2,
      "relatedCaseIds": [
        "PAGE-002_TC-002"
      ]
    },
    {
      "id": "BUG-005",
      "pageId": "PAGE-002",
      "pageName": "PC首頁",
      "caseId": "PAGE-002_TC-004",
      "description": "首頁待辦與異常 CALL 的查看列表跳轉沒有套用入口篩選，均顯示全部14筆 CALL。",
      "steps": "ADMIN 登入 → 首頁 → 今日待辦「查看列表」；返回首頁 → 異常CALL「查看列表」；檢查 CALL 管理篩選及列表。",
      "severity": "P2",
      "screenshotCell": "查看原圖",
      "status": "待處理",
      "expectedActual": "預期：列表與所選入口對應。實際：所有篩選為「全部」，含無關狀態記錄。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-004_FAIL_UNFILTERED_ABNORMAL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 3,
      "relatedCaseIds": [
        "PAGE-002_TC-004"
      ]
    },
    {
      "id": "BUG-006",
      "pageId": "PAGE-002",
      "pageName": "PC首頁",
      "caseId": "PAGE-002_TC-007",
      "description": "390px 窄屏下首頁指標卡過窄，文字逐字縱向換行，主要數字/標籤可讀性明顯下降。",
      "steps": "ADMIN 登入 → 首頁 → 使用瀏覽器響應式視圖設為390px → 檢查頂部指標卡。",
      "severity": "P2",
      "screenshotCell": "查看原圖",
      "status": "待處理",
      "expectedActual": "預期：重要文字可讀、主要操作可觸及且無明顯版面問題。實際：卡片壓縮至窄欄，標籤逐字換行。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-002_TC-007_FAIL_NARROW.png"
      ],
      "sheet": "01_問題彙總",
      "row": 4,
      "relatedCaseIds": [
        "PAGE-002_TC-007"
      ]
    },
    {
      "id": "BUG-001",
      "pageId": "PAGE-003",
      "pageName": "CALL管理",
      "caseId": "PAGE-003_TC-014",
      "description": "僅輸入空格的 CALL 描述仍可通過提交並建立記錄。",
      "steps": "CS／ADMIN 登入隔離原型 → CALL管理 → 新增CALL → 補齊其餘必填 → 描述輸入三個空格 → 提交 → 查看列表。",
      "severity": "P2",
      "screenshotCell": "原始 FAIL 截圖缺失；修改後回歸由 Computer Use 實際確認，未另存 PNG。",
      "status": "已修復（回歸 PASS）",
      "expectedActual": "預期：拒絕純空格描述。首次執行：建立 WO-20261107-002（FAIL）。修改後回歸（2026-11-07，隔離本機原型）：描述欄下方顯示「請填寫 Call 描述。」、焦點返回描述欄，記錄數未增加（PASS）。",
      "thumbnailCell": "",
      "screenshots": [],
      "sheet": "01_問題彙總",
      "row": 5,
      "relatedCaseIds": [
        "PAGE-003_TC-014"
      ]
    },
    {
      "id": "BUG-002",
      "pageId": "PAGE-005",
      "pageName": "分派中心",
      "caseId": "PAGE-005_TC-012",
      "description": "分派中心類型顯示 P（工程）、M+P（保養＋工程）；項目使用者澄清本處「工程」與「維修」同義，故符合 SOURCE-032 Q5 業務分類，本次重測通過，無需改原型。",
      "steps": "管理員 → 分派中心 → 待處理 → 打開任務 T-261108-001 的「處理」→ 展開任務類型；確認介面文案後依使用者對術語的澄清判定，不保存。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-012_PASS_TERMINOLOGY_EQUIVALENT_20261108.png\",\"查看澄清後證據\")",
      "status": "重測 PASS（使用者澄清術語同義）",
      "expectedActual": "介面實際顯示 M（保養）、P（工程）、M+P（保養＋工程）。使用者於 2026-11-08 澄清 P 的工程／維修在此處同義，且 M+P 為保養＋工程；因此與 SOURCE-032 Q5 的業務分類等價，重測判定 PASS。此前依字面差異記錄的 FAIL 版保留作歷史，當前結論以本報告為準。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-012_PASS_TERMINOLOGY_EQUIVALENT_20261108.png"
      ],
      "sheet": "01_問題彙總",
      "row": 6,
      "relatedCaseIds": [
        "PAGE-005_TC-012"
      ]
    },
    {
      "id": "BUG-003",
      "pageId": "PAGE-003",
      "pageName": "CALL管理",
      "caseId": "PAGE-003_TC-015",
      "description": "新增 CALL 描述欄名稱／分區文案歷史問題；本輪以本機HTTP原型重新查看描述欄。",
      "steps": "CALL管理 → 新增CALL → 查看描述區塊標題、描述必填欄名，不提交。",
      "severity": "P3",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-003_TC-015_PASS_LABEL_20261108_RETEST_SCROLL.png\",\"查看重測圖\")",
      "status": "重測 PASS",
      "expectedActual": "預期：欄名清楚表示 CALL 內容／描述。實際（2026-11-08）：區塊標題「Call描述與附件」，必填欄「Call描述 *」，符合預期；已保存新截圖。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-003_TC-015_PASS_LABEL_20261108_RETEST_SCROLL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 7,
      "relatedCaseIds": [
        "PAGE-003_TC-015"
      ]
    },
    {
      "id": "BUG-007",
      "pageId": "PAGE-003",
      "pageName": "CALL管理",
      "caseId": "PAGE-003_TC-002",
      "description": "CALL列表缺少 CALL 編號及客戶名稱搜尋輸入控件，無法按關鍵字查找或檢查無匹配空態。",
      "steps": "管理員 → CALL管理 → 依 CALL 編號、客戶名稱搜尋；輸入 QA-NO-MATCH-20261108；點重置確認列表恢復。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-003_TC-002_PASS_SEARCH_20261108_RETEST.png\",\"查看重測圖\")",
      "status": "重測 PASS",
      "expectedActual": "預期：可按 CALL 編號、客戶名稱及狀態篩選，無匹配時顯示空態，重置後恢復列表。實際（2026-11-08）：WO-DEMO-FIN-MP-001 與「維多利亞酒店」各匹配1筆；無匹配時顯示「暫無匹配 CALL」；重置恢復14筆。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-003_TC-002_PASS_SEARCH_20261108_RETEST.png"
      ],
      "sheet": "01_問題彙總",
      "row": 8,
      "relatedCaseIds": [
        "PAGE-003_TC-002"
      ]
    },
    {
      "id": "BUG-008",
      "pageId": "PAGE-003",
      "pageName": "CALL管理",
      "caseId": "PAGE-003_TC-009",
      "description": "編輯 CALL 必填欄位需參照新增 CALL 標示及校驗，包括客戶名稱、聯絡人、CALL 類型、主管及問題描述。",
      "steps": "管理員林主管 → CALL管理 → 開啟 WO-20260615-003 編輯 → 核對客戶名稱、聯絡人、CALL 類型、主管、問題描述必填標記 → 聯絡人輸入純空格後保存 → 核對提示並取消確認原資料。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-003_TC-009_PASS_REQUIRED_FIELDS_20261108_RETEST.png\",\"查看重測圖\")",
      "status": "已修復（回歸 PASS）",
      "expectedActual": "預期：編輯表單按新增 CALL 規則標示必填，空白或純空格不能保存。實際（2026-11-08，管理員林主管，本機 HTTP 原型）：客戶名稱（唯讀）、聯絡人、CALL 類型、主管及問題描述均顯示必填星號；聯絡人、類型、主管及描述控件帶 required。聯絡人僅輸入空格後保存，系統顯示「請填寫聯絡人」並阻止保存；取消後原聯絡人及問題描述未變。電話和地址保持選填。回歸 PASS。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-003_TC-009_PASS_REQUIRED_FIELDS_20261108_RETEST.png"
      ],
      "sheet": "01_問題彙總",
      "row": 9,
      "relatedCaseIds": [
        "PAGE-003_TC-009"
      ]
    },
    {
      "id": "BUG-009",
      "pageId": "PAGE-004",
      "pageName": "新建工單來電記錄",
      "caseId": "PAGE-004_TC-008",
      "description": "新增 CALL 選擇客戶後，客戶地址與地址地區篩選未同步；地址搜尋亦需沿用新增客戶組件的無匹配提示。",
      "steps": "CS 陳小姐 → CALL管理 → 新增CALL → 選港島商業中心，確認地址／地區；再切換九龍國際廣場，確認兩者更新；取消表單。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-004_TC-008_PASS_CUSTOMER_REGION_SYNC_20261108_RETEST.png\",\"查看重測圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：選擇客戶後自動帶出其主要服務地址及對應地區；切換客戶時兩者同步更新。地址搜尋無匹配時提示可直接輸入新地址。實際（2026-11-08，CS 陳小姐，本機 HTTP 原型）：選「港島商業中心」後顯示「中環德輔道中88號／港島」；切換「九龍國際廣場」後更新為「尖沙咀彌敦道123號／九龍」。上一輪已確認未匹配地址提示。取消表單，未建立測試記錄。回歸 PASS。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-004_TC-008_PASS_CUSTOMER_REGION_SYNC_20261108_RETEST.png"
      ],
      "sheet": "01_問題彙總",
      "row": 10,
      "relatedCaseIds": [
        "PAGE-004_TC-008"
      ]
    },
    {
      "id": "BUG-010",
      "pageId": "PAGE-005",
      "pageName": "分派中心",
      "caseId": "PAGE-005_TC-002",
      "description": "分派中心缺少師傅及關鍵詞搜尋控件；原有關鍵詞輸入時重繪頁面會打斷連續輸入，且重置未返回全部狀態。",
      "steps": "TL 李組長 → 分派中心 → 待處理 → 在關鍵詞框連續輸入 QA-INPUT-20261108X，確認文字完整、焦點保持及無匹配空態；按重置確認返回全部並恢復 8 條。另回歸「已分派＋1區＋趙師傅」命中 T-261107-005。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-002_PASS_KEYWORD_INPUT_20261108_RETEST.png\",\"查看重測圖\")",
      "status": "已修復（回歸 PASS，已審核）",
      "expectedActual": "預期：可按狀態、區域、師傅及關鍵詞查找；輸入過程不中斷；無匹配時顯示空態；清除後恢復全部列表。實際（2026-11-08，本機 HTTP 原型，TL 李組長）：關鍵詞欄可連續輸入 QA-INPUT-20261108X，延遲更新後顯示無匹配空態；更新後焦點仍在輸入框，可繼續輸入；按「重置」返回「全部」並恢復 8 條記錄。先前已確認「已分派＋1區＋趙師傅」命中 T-261107-005。回歸 PASS，已審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-002_PASS_KEYWORD_INPUT_20261108_RETEST.png"
      ],
      "sheet": "01_問題彙總",
      "row": 11,
      "relatedCaseIds": [
        "PAGE-005_TC-002"
      ]
    },
    {
      "id": "BUG-011",
      "pageId": "PAGE-005",
      "pageName": "分派中心",
      "caseId": "PAGE-005_TC-005",
      "description": "直接派工備註提交後，在任務詳情及處理記錄中均未顯示，無法確認備註已保存。",
      "steps": "TL 趙組長 → 分派中心 → 對隔離樣例新建直接分派 → 選趙師傅並輸入「QA-20261107 電話約定時間 2026-11-08 10:00」→ 確認 → 重開 T-261107-005 詳情及處理記錄。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-005_TC-005_PASS_NOTE_RECORDS_20261108.png\",\"查看處理記錄\")",
      "status": "已修復（回歸 PASS，已審核）",
      "expectedActual": "預期：師傅及派工備註保存一致，列表、詳情與提示相符。實際（2026-11-08，本機 HTTP 原型，TL 趙組長）：重開隔離測試任務 T-261107-005，詳情顯示「已分派」、趙師傅及派工備註「QA-20261107 電話約定時間 2026-11-08 10:00」；切換「處理記錄」可見由趙組長提交的同內容「派工備註」記錄。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-005_TC-005_PASS_NOTE_RECORDS_20261108.png"
      ],
      "sheet": "01_問題彙總",
      "row": 12,
      "relatedCaseIds": [
        "PAGE-005_TC-005"
      ]
    },
    {
      "id": "BUG-012",
      "pageId": "PAGE-007",
      "pageName": "報價管理",
      "caseId": "PAGE-007_TC-002",
      "description": "報價篩選區未提供報價編號或關鍵字查找欄位，無法按編號搜尋或驗證無匹配結果。",
      "steps": "QUO 鄒組長 → 報價管理 → 查看篩選區 → 嘗試按已知報價編號搜尋並輸入 QA-NO-MATCH。客戶及狀態條件可用，但沒有編號／關鍵字輸入欄。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-002_PASS_EMPTY_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：可按報價編號、客戶等查找並在無匹配時顯示空態。實際（2026-11-09，本機 HTTP 原型，QUO 鄒組長）：輸入 QT-20260621-002 可定位九龍國際廣場報價；輸入 QA-NO-MATCH-20261109 顯示「暫無匹配報價」，重置後恢復 12 筆。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-002_PASS_EMPTY_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 13,
      "relatedCaseIds": [
        "PAGE-007_TC-002"
      ]
    },
    {
      "id": "BUG-024",
      "pageId": "PAGE-007",
      "pageName": "報價管理",
      "caseId": "PAGE-007_TC-008",
      "description": "價格變動版本表單允許料項名稱留空並保存新版本。",
      "steps": "QUO → 報價管理 → 打開樣例報價的價格變動 → 清空一個料項名稱 → 保存 → 檢查新版本。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-008_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：缺少必填料項名稱時阻止保存。實際：保存成功並生成版本002，之後在本地Mock補回料項繼續測試，生成003；未觸及倉庫通或外部系統。編號更正：保留歷史客戶資料BUG-013，本報告報價問題改為BUG-024以解除撞號。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-008_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 14,
      "relatedCaseIds": [
        "PAGE-007_TC-008"
      ]
    },
    {
      "id": "BUG-014",
      "pageId": "PAGE-007",
      "pageName": "報價管理",
      "caseId": "PAGE-007_TC-009",
      "description": "報價編輯保存後，詳情版本卡片顯示 Rundefined／RNaN，版本標籤缺少有效序號。",
      "steps": "QUO → 報價管理 → 編輯隔離測試報價標題並保存 → 重開詳情 → 查看版本卡片。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-007_TC-009_PASS_REVISION_HISTORY_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：保存後版本標籤顯示有效序號。實際（2026-11-09，本機 HTTP 原型，QUO 鄒組長）：編輯並保存隔離報價後，標題保留、OUR REF 為 002；詳情版本記錄顯示 R0、R0、R1（當前），未再出現 Rundefined 或 RNaN。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-007_TC-009_PASS_REVISION_HISTORY_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 15,
      "relatedCaseIds": [
        "PAGE-007_TC-009"
      ]
    },
    {
      "id": "BUG-015",
      "pageId": "PAGE-008",
      "pageName": "標書管理",
      "caseId": "PAGE-008_TC-013",
      "description": "已中標標書詳情未提供基線用例指定的排程開啟／取消入口，無法驗證排程彈窗。",
      "steps": "TENDER 郭標書 → 標書管理 → 打開已中標 T-2026-002 詳情 → 檢查標題、詳情及底部操作。沒有點擊狀態確認或外部同步。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-008_TC-013_PASS_MODAL_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：已中標標書可開啟排程並能取消返回。實際（2026-11-09，本機 HTTP 原型，TENDER 郭標書）：T-2026-002 詳情顯示「安排排程」；排程彈窗可見日期、重複安排及師傅選擇，點取消返回，未保存排程或改變標書狀態。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-008_TC-013_PASS_MODAL_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 16,
      "relatedCaseIds": [
        "PAGE-008_TC-013"
      ]
    },
    {
      "id": "BUG-016",
      "pageId": "PAGE-009",
      "pageName": "備貨管理",
      "caseId": "PAGE-009_TC-004",
      "description": "備貨詳情中的採購單僅顯示內嵌卡片，採購單編號無法打開獨立詳情。",
      "steps": "PUR 張採購 → 備貨管理 → 查看 SP-260620-0001 → 點擊採購單 PO-20260620-001 編號。頁面仍停留在備貨詳情，沒有採購單詳情或頁面切換。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-004_PASS_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：關聯採購單可開啟獨立詳情並能返回。實際（2026-11-09，本機 HTTP 原型，PUR 張採購）：從 SP-260620-0001 點擊 PO-20260620-001 後開啟採購單詳情，顯示供應商、狀態、備貨單關聯、金額及物料；未提交或修改採購單。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-004_PASS_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 17,
      "relatedCaseIds": [
        "PAGE-009_TC-004"
      ]
    },
    {
      "id": "BUG-017",
      "pageId": "PAGE-009",
      "pageName": "備貨管理",
      "caseId": "PAGE-009_TC-005",
      "description": "備貨詳情中的關聯報價編號按鈕無法開啟報價詳情，不能唯讀核對報價物料及數量。",
      "steps": "PUR 張採購 → 備貨管理 → 查看 SP-260620-0001 → 點擊 QT-20260621-004。畫面維持原備貨詳情。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-009_TC-005_PASS_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：關聯報價可開啟唯讀詳情，且不改變原資料。實際（2026-11-09，本機 HTTP 原型，PUR 張採購）：從備貨詳情點擊 QT-20260621-004 後開啟「關聯報價詳情」唯讀視窗。此樣例沒有報價物料行，畫面如實顯示暫無物料，因此本次確認了入口及唯讀詳情，未能用該樣例核對數量。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-009_TC-005_PASS_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 18,
      "relatedCaseIds": [
        "PAGE-009_TC-005"
      ]
    },
    {
      "id": "BUG-018",
      "pageId": "PAGE-010",
      "pageName": "會計待開票",
      "caseId": "PAGE-010_TC-001",
      "description": "陳會計登入後會計管理主內容區完全空白，沒有待開票清單或操作入口；重新進入後仍空白。",
      "steps": "登入頁選會計部 → 選陳會計 → 進入會計管理 → 重新點選側欄會計管理；確認標題與側欄可見，但主內容持續空白。",
      "severity": "P1",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-010_TC-001_PASS_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：會計待開票頁載入列表與主要操作。實際（2026-11-09，本機 HTTP 原型，陳會計）：進入會計管理並選「待開票」後，待開票內容、篩選器及列表正常顯示，共 30 條記錄；主內容不再留在舊的收款列表。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-010_TC-001_PASS_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 19,
      "relatedCaseIds": [
        "PAGE-010_TC-001"
      ]
    },
    {
      "id": "BUG-019",
      "pageId": "PAGE-015",
      "pageName": "報告管理",
      "caseId": "PAGE-015_TC-002",
      "description": "報告管理關鍵字搜尋無法按報告編號定位列表中已存在的服務報告。",
      "steps": "以 CR 何關係進入報告管理；關鍵字輸入 SR-250298 並保持「已完成」狀態後搜尋，列表顯示無符合條件。改以客戶「安全監控管理有限公司」搜尋，則可找到同一筆 SR-250298；重置後恢復 5 筆。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-002_PASS_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：輸入既有報告編號及狀態後找到相符報告。實際（2026-11-09，本機 HTTP 原型，CR 何關係）：在已完成列表搜尋 SR-250298，返回該筆安全監控管理有限公司服務報告，共 1 筆。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-002_PASS_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 20,
      "relatedCaseIds": [
        "PAGE-015_TC-002"
      ]
    },
    {
      "id": "BUG-020",
      "pageId": "PAGE-015",
      "pageName": "報告管理",
      "caseId": "PAGE-015_TC-007",
      "description": "報告詳情沒有列印或列印預覽入口，無法檢查既有報告的頁面預覽。",
      "steps": "CR 何關係進入報告管理，分別打開 PC 服務報告詳情及移動端 SR-250298 詳情並檢查內容底部；可見詳情及發送操作，沒有列印／預覽按鈕。未觸發列印或外部發送。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-015_TC-007_PASS_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：PC及移動端均可開啟報告預覽並查看末頁與簽名區。實際（2026-11-09，本機 HTTP 原型，CR 何關係）：PC及移動端 SR-250298 均可開啟兩頁唯讀列印預覽；PC可查看末頁簽名區。沒有觸發實際列印或外部發送。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-015_TC-007_PASS_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 21,
      "relatedCaseIds": [
        "PAGE-015_TC-007"
      ]
    },
    {
      "id": "BUG-021",
      "pageId": "PAGE-016",
      "pageName": "統計報表",
      "caseId": "PAGE-016_TC-002",
      "description": "CALL列表「已安排」狀態與M類別組合篩選返回0筆，單獨M類別篩選則有記錄。",
      "steps": "以系統管理員進入CALL管理，選「已安排」狀態篩選，列表顯示7筆；再選類別M，結果變為「暫無匹配CALL」、0筆。重置後單獨選M可見4筆。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-016_TC-002_PASS_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：狀態與M類別組合篩選返回符合記錄。實際（2026-11-09，本機 HTTP 原型，系統管理員）：CALL管理選「已安排」及類別 M，列表顯示 5 筆相符記錄；不再顯示 0 筆。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-016_TC-002_PASS_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 22,
      "relatedCaseIds": [
        "PAGE-016_TC-002"
      ]
    },
    {
      "id": "BUG-022",
      "pageId": "PAGE-016／017／019",
      "pageName": "統計報表／字典管理／用戶管理",
      "caseId": "PAGE-016_TC-005",
      "description": "窄屏下頁面沒有可見的側邊導航、漢堡菜單或替代主導航入口；用戶列表其餘欄位可水平捲動查看。",
      "steps": "分別於統計報表、字典管理及用戶管理將瀏覽器視口設為390×645；檢查頁首及菜單。三頁內容可縱向瀏覽，但均沒有側邊導航或替代入口；用戶列表可水平捲動至查看／編輯操作。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-011_NAV_FAIL.png\",\"查看本輪截圖\")",
      "status": "待處理",
      "expectedActual": "預期：窄屏下導航與主要操作均可觸及。實際：頁首無導航入口；用戶表格內部水平捲動後可觸及查看／編輯操作。相同導航缺失沿用BUG-022。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-011_NAV_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 23,
      "relatedCaseIds": [
        "PAGE-016_TC-005",
        "PAGE-017_TC-011",
        "PAGE-019_TC-011"
      ]
    },
    {
      "id": "BUG-023",
      "pageId": "PAGE-017",
      "pageName": "字典管理",
      "caseId": "PAGE-017_TC-007",
      "description": "字典項編輯表單缺少狀態欄位，無法編輯或校驗狀態。",
      "steps": "分別以D報004隔離測試字典項開啟編輯：表單只顯示名稱及編碼，沒有狀態控件。清空名稱與編碼保存，頁面僅提示名稱必填；使用有效名稱及編碼保存並重新整理後，兩欄值持久化，但狀態欄位不可編輯。關聯用例PAGE-017_TC-007及PAGE-017_TC-008。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-017_TC-007_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：編輯表單提供狀態欄位並能按必填規則阻止缺少狀態的提交。實際：表單不提供狀態控件，只能編輯名稱及編碼。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-017_TC-007_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 24,
      "relatedCaseIds": [
        "PAGE-017_TC-007"
      ]
    },
    {
      "id": "BUG-013",
      "pageId": "PAGE-018",
      "pageName": "客戶管理",
      "caseId": "PAGE-018_TC-009",
      "description": "客戶聯絡人編輯保存後，刷新及重新登入會回復原值；本輪再次重現歷史問題。",
      "steps": "在隔離本機客戶管理中開啟測試客戶；修改聯絡人並保存，畫面提示更新成功；重新整理並重新登入系統管理員，再開啟同一客戶，聯絡人顯示原值。PAGE-018_TC-009與TC-013均重現。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-009_PASS_20261109.png\",\"查看回歸截圖\")",
      "status": "已修復（回歸 PASS，待審核）",
      "expectedActual": "預期：保存後的聯絡人於刷新及重新登入後保持。實際（2026-11-09，本機 HTTP 原型，系統管理員）：將港島商業中心聯絡人改為 QA-20261109-BUG013-持久化验证，保存後刷新並重新登入，仍顯示新值；隨後恢復原值「陳先生」並刷新確認。回歸 PASS，待審核。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-009_PASS_20261109.png"
      ],
      "sheet": "01_問題彙總",
      "row": 25,
      "relatedCaseIds": [
        "PAGE-018_TC-009",
        "PAGE-018_TC-013"
      ]
    },
    {
      "id": "BUG-025",
      "pageId": "PAGE-018",
      "pageName": "客戶管理",
      "caseId": "PAGE-018_TC-008",
      "description": "編輯客戶必填欄位留空仍顯示更新成功並關閉表單。",
      "steps": "系統管理員→基礎設置→客戶管理→編輯任一測試客戶→清空聯絡人、電話及地址→保存；頁面顯示「客戶資訊已更新」並關閉表單，但列表資料仍是原值。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-008_FAIL.png\",\"查看本輪截圖\")",
      "status": "待處理",
      "expectedActual": "預期：阻止必填欄位留空並指出欄位。實際：提示更新成功、表單關閉，資料未更新。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-008_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 26,
      "relatedCaseIds": [
        "PAGE-018_TC-008"
      ]
    },
    {
      "id": "BUG-026",
      "pageId": "PAGE-018",
      "pageName": "客戶管理",
      "caseId": "PAGE-018_TC-010",
      "description": "客戶詳情沒有可見的CALL歷史或關聯報價，也沒有從客戶直接建立預填客戶的報價入口。",
      "steps": "系統管理員→客戶管理→打開客戶詳情→檢查CALL歷史與報價區域／關聯入口；再嘗試由客戶詳情新建報價。頁面沒有上述關聯與預填入口；單獨新建報價後取消。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-018_TC-010_FAIL.png\",\"查看本輪截圖\")",
      "status": "待處理",
      "expectedActual": "預期：可從客戶查看所屬CALL與報價，並由客戶進入預填報價。實際：詳情無可見關聯或預填入口；取消新建未留下記錄。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-018_TC-010_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 27,
      "relatedCaseIds": [
        "PAGE-018_TC-010"
      ]
    },
    {
      "id": "BUG-027",
      "pageId": "PAGE-019",
      "pageName": "用戶管理",
      "caseId": "PAGE-019_TC-003",
      "description": "用戶詳情面板沒有關閉按鈕，重新點擊同一用戶也不會收起面板。",
      "steps": "系統管理員→基礎設置→用戶管理→打開陳大文 EMP0008 的查看詳情→檢查面板頂部及操作；沒有關閉控制；再次點擊同一列／查看，面板仍保持顯示。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-019_TC-003_FAIL.png\",\"查看本輪截圖\")",
      "status": "待處理",
      "expectedActual": "預期：有關閉控制，可返回可操作的用戶列表。實際：沒有關閉按鈕，重選同一列亦不收起面板。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-019_TC-003_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 28,
      "relatedCaseIds": [
        "PAGE-019_TC-003"
      ]
    },
    {
      "id": "BUG-028",
      "pageId": "PAGE-020／021",
      "pageName": "服務器空間／Excel 導入",
      "caseId": "PAGE-020_TC-001",
      "description": "全局頁首一直顯示「字典管理」，與服務器空間及 Excel 導入的實際內容頁不一致。",
      "steps": "系統管理員→基礎設置→依次打開服務器空間與 Excel 導入；兩頁內容標題各自正確，但全局頁首均為「字典管理」。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-020_TC-001_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：全局頁首與目前頁面一致。實際：兩個頁面均顯示字典管理。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-020_TC-001_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 29,
      "relatedCaseIds": [
        "PAGE-020_TC-001",
        "PAGE-021_TC-001"
      ]
    },
    {
      "id": "BUG-029",
      "pageId": "PAGE-020",
      "pageName": "服務器空間",
      "caseId": "PAGE-020_TC-002",
      "description": "切換服務商後，區域、Endpoint、Bucket 及摘要沒有隨選中服務商聯動。",
      "steps": "系統管理員→基礎設置→服務器空間→記下目前阿里雲 OSS 值→選擇騰訊雲 COS；查看表單及摘要，仍顯示阿里雲 OSS 資料；未保存。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-020_TC-002_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：服務商欄位及摘要與選中服務商匹配。實際：選中騰訊雲 COS 後仍顯示阿里雲 OSS。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-020_TC-002_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 30,
      "relatedCaseIds": [
        "PAGE-020_TC-002"
      ]
    },
    {
      "id": "BUG-030",
      "pageId": "PAGE-021",
      "pageName": "Excel 導入",
      "caseId": "PAGE-021_TC-003",
      "description": "模板下載操作只顯示模擬成功提示，沒有下載可讀取的模板檔案。",
      "steps": "系統管理員→基礎設置→Excel 導入→選收款記錄→點擊下載模板；畫面顯示「模板已下載（模擬）」，下載目錄沒有生成模板檔案。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-003_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：下載模板並可檢查首行欄位。實際：僅顯示模擬提示，沒有實際文件。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-003_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 31,
      "relatedCaseIds": [
        "PAGE-021_TC-003"
      ]
    },
    {
      "id": "BUG-031",
      "pageId": "PAGE-021",
      "pageName": "Excel 導入",
      "caseId": "PAGE-021_TC-004",
      "description": "頁面接受 10.5MB 的 .xlsx 檔並顯示資料預覽，未遵守畫面列出的「文件大小不超過 10MB」限制。",
      "steps": "系統管理員→基礎設置→Excel 導入→收款記錄→選取本機隔離檔 oversize_test.xlsx（10.5MB）；頁面顯示數據預覽及 1 行有效記錄；不確認導入。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-004_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：超過 10MB 的文件被拒絕並明確提示，不新增導入記錄。實際：文件進入預覽。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-004_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 32,
      "relatedCaseIds": [
        "PAGE-021_TC-004"
      ]
    },
    {
      "id": "BUG-032",
      "pageId": "PAGE-021",
      "pageName": "Excel 導入",
      "caseId": "PAGE-021_TC-006",
      "description": "390×645 窄屏下，導入類型與模板卡片仍並排，模板標題、按鈕及字段說明被右側裁切。",
      "steps": "系統管理員→基礎設置→Excel 導入→將視口設為 390×645；查看模板下載卡片，文字與下載按鈕超出可視寬度。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-021_TC-006_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：窄屏內容可讀且主要操作可觸及。實際：模板卡片內容被右側裁切。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-021_TC-006_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 33,
      "relatedCaseIds": [
        "PAGE-021_TC-006"
      ]
    },
    {
      "id": "BUG-033",
      "pageId": "PAGE-022",
      "pageName": "組件庫",
      "caseId": "PAGE-022_TC-002",
      "description": "組件視圖分類點擊後未切換；CALL 視圖選取狀態與預覽內容仍停留在客戶視圖。",
      "steps": "系統管理員→基礎設置→組件庫→點擊「CALL視圖」；檢查選取狀態及預覽區，之後再以鍵盤聚焦切換；兩種操作後均未切換。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-022_TC-002_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：CALL 視圖被選取並顯示 CALL 範例。實際：仍顯示客戶視圖。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-022_TC-002_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 34,
      "relatedCaseIds": [
        "PAGE-022_TC-002"
      ]
    },
    {
      "id": "BUG-034",
      "pageId": "PAGE-022",
      "pageName": "組件庫",
      "caseId": "PAGE-022_TC-003",
      "description": "範例表格的搜尋篩選、分頁及詳情入口未更新內容或打開詳情。",
      "steps": "組件庫→範例表格→選「政府」並點搜尋，表格仍顯示私人客戶；點第 2 頁後分頁仍顯示 1/2；點「查看詳情」未打開詳情。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-022_TC-003_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：篩選結果、頁碼及詳情依操作更新。實際：三項操作均無狀態變更。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-022_TC-003_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 35,
      "relatedCaseIds": [
        "PAGE-022_TC-003"
      ]
    },
    {
      "id": "BUG-035",
      "pageId": "PAGE-022",
      "pageName": "組件庫",
      "caseId": "PAGE-022_TC-004",
      "description": "390×645 視口下組件範例卡片和篩選區文字/控制項被右側裁切。",
      "steps": "將視口設為 390×645→組件庫→查看組件預覽與篩選卡片；多處文字/控制項超出可視區。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-022_TC-004_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：窄屏內容可讀、主要控制項可觸及。實際：部分內容被右側裁切。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-022_TC-004_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 36,
      "relatedCaseIds": [
        "PAGE-022_TC-004"
      ]
    },
    {
      "id": "BUG-036",
      "pageId": "PAGE-025",
      "pageName": "移動工單詳情",
      "caseId": "PAGE-025_TC-002",
      "description": "師傅 CALL 卡片與同編號詳情抽屜顯示不同客戶；WO-20260615-004 卡片為新界住宅項目，詳情卻為香港政府大樓／合約 1P2600004。",
      "steps": "周師傅→移動端→待處理→WO-20260615-004（卡片顯示新界住宅項目）→點工單編號查看詳情→比較列表與詳情的客戶名稱、合約及工單號。",
      "severity": "P1",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-025_TC-002_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：同一工單編號的列表與詳情保持相同客戶及派工資料。實際：客戶名稱不一致，可能導致現場人員依錯誤客戶資訊處理。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-025_TC-002_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 37,
      "relatedCaseIds": [
        "PAGE-025_TC-002"
      ]
    },
    {
      "id": "BUG-037",
      "pageId": "PAGE-026",
      "pageName": "移動SR填報",
      "caseId": "PAGE-026_TC-004",
      "description": "SR 表單提交操作在空白必填資料與已填本機樣例兩種情況下均沒有顯示必填錯誤、成功訊息或缺項原因；頁面停留在原表單。",
      "steps": "周師傅→移動端→已完成→WO-DEMO-FIN-P-001→編輯報告。空白狀態點「完成並提交服務報告」；再補入測試資料、示例圖片、兩項報價選項及 QA 測試簽名，對本機樣例點提交一次。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-028_TC-002_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：空白表單指出缺項；有效樣例提交後顯示明確結果。實際：兩種提交後均停留原表單且無可見回饋；已完成任務狀態仍保持已完成。有效樣例只提交一次。；本輪 PAGE-028_TC-002 在已填本機樣例提交一次後仍停留原表單，證據見對應用例行。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-028_TC-002_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 38,
      "relatedCaseIds": [
        "PAGE-026_TC-004",
        "PAGE-026_TC-006",
        "PAGE-026_TC-010",
        "PAGE-028_TC-001",
        "PAGE-028_TC-002"
      ]
    },
    {
      "id": "BUG-038",
      "pageId": "PAGE-029",
      "pageName": "主管移動首頁",
      "caseId": "PAGE-029_TC-002",
      "description": "「可接單師傅 12」統計卡點擊後錯誤導向待分派 CALL 清單，沒有師傅列表。",
      "steps": "李組長→移動端→主管首頁→點擊「可接單師傅 12」；畫面顯示分派中心「CALL 清單（2 張）」及兩筆待分派工單。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-029_TC-002_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：進入可接單師傅名單或對應人員清單。實際：導向待分派 CALL 清單，與卡片對象不一致。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-029_TC-002_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 39,
      "relatedCaseIds": [
        "PAGE-029_TC-002"
      ]
    },
    {
      "id": "BUG-039",
      "pageId": "PAGE-030",
      "pageName": "主管移動分派",
      "caseId": "PAGE-030_TC-003",
      "description": "未選師傅時確認分派按鈕雖禁用，但沒有說明必須先選師傅或其他可見提示。",
      "steps": "李組長→移動端→分派→WO-20260615-001→不選師傅點「確認分派」。",
      "severity": "P3",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-003_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：阻止提交並提示必填原因。實際：按鈕禁用，點擊後沒有提示、Toast 或欄位說明。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-003_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 40,
      "relatedCaseIds": [
        "PAGE-030_TC-003"
      ]
    },
    {
      "id": "BUG-040",
      "pageId": "PAGE-030",
      "pageName": "主管移動分派",
      "caseId": "PAGE-030_TC-004",
      "description": "選擇師傅並填寫派工備註後確認，未保存師傅或備註，列表仍顯示待分派。",
      "steps": "本機 Mock：WO-20260615-001→選趙師傅→輸入「QA-20261106 電話約定時間」→確認；關閉後重開。",
      "severity": "P1",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-004_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：派工成功後師傅、備註可回看，列表狀態同步。實際：首次確認轉到任務處理抽屜；返回後列表仍待分派，重開時沒有師傅或備註。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-004_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 41,
      "relatedCaseIds": [
        "PAGE-030_TC-004"
      ]
    },
    {
      "id": "BUG-041",
      "pageId": "PAGE-030",
      "pageName": "主管移動分派",
      "caseId": "PAGE-030_TC-002",
      "description": "已分派狀態的工單卡片點擊無反應，無法打開任務抽屜查看該筆記錄。",
      "steps": "李組長→移動端→分派→切換「已分派 4」→點擊第一張 WO-20260615-004 卡片。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-030_TC-002_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：點擊任務後打開對應工單抽屜並顯示相同編號。實際：畫面及可訪問性樹均沒有變化。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-030_TC-002_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 42,
      "relatedCaseIds": [
        "PAGE-030_TC-002"
      ]
    },
    {
      "id": "BUG-042",
      "pageId": "PAGE-032",
      "pageName": "CR移動區域CALL",
      "caseId": "PAGE-032_TC-003",
      "description": "區域 CALL 列表與詳情中的客戶名稱不一致：WO-20260613-009 列表顯示「安全監控管理有限公司」，詳情顯示「新界花園住宅」。",
      "steps": "以 QA Luna Local 20261107（2區）進入移動端 CALL；狀態篩選選「已完成」；點擊 WO-20260613-009 的「查看工單」；對照來源列與詳情標題／客戶資料。",
      "severity": "P1",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-032_TC-003_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：詳情的工單編號及客戶資料與來源列屬於同一筆 CALL。實際：編號相同，客戶名稱不同；詳情中展示另一客戶名稱。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-032_TC-003_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 43,
      "relatedCaseIds": [
        "PAGE-032_TC-003"
      ]
    },
    {
      "id": "BUG-043",
      "pageId": "PAGE-032",
      "pageName": "CR移動區域CALL",
      "caseId": "PAGE-032_TC-005",
      "description": "390px 窄屏下 CALL 類型篩選器超出內容容器右邊界，選項控制被截斷。",
      "steps": "以陳關係（1區）打開移動端 CALL；將瀏覽器響應式視口設為 390×645；查看篩選區狀態與 CALL 類型兩個並排選擇器。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-032_TC-005_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：窄屏下篩選控制完整可見並可操作，沒有非預期橫向裁切。實際：CALL 類型控制延伸至視口右側，右端及下拉箭頭不可見。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-032_TC-005_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 44,
      "relatedCaseIds": [
        "PAGE-032_TC-005"
      ]
    },
    {
      "id": "BUG-044",
      "pageId": "PAGE-034",
      "pageName": "CR移動客戶報告",
      "caseId": "PAGE-034_TC-002",
      "description": "客戶報告列表搜尋框按其提示輸入可見報告編號SR-250315後，結果顯示0份及「暫無符合條件的報告」；清除搜尋後該報告重新出現。",
      "steps": "CR身份進入移動端→報告；確認初始列表有SR-250315（已完成）；在搜尋欄輸入SR-250315；觀察結果為0份；清除搜尋並確認列表恢復3份。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-034_TC-002_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：依搜尋框提示以報告編號搜尋，應找到清單中同編號記錄。實際：搜尋SR-250315返回0份，清除後列表中可見同一筆報告。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-034_TC-002_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 45,
      "relatedCaseIds": [
        "PAGE-034_TC-002"
      ]
    },
    {
      "id": "BUG-045",
      "pageId": "PAGE-034",
      "pageName": "CR移動客戶報告",
      "caseId": "PAGE-034_TC-003",
      "description": "列表首筆CP-CP-DEMO-MP-001的查看報告詳情未展示該報告編號；詳情主標題僅顯示「SR」，而來源列為CP-CP-DEMO-MP-001。",
      "steps": "CR身份進入移動端→報告；記錄首筆CP-CP-DEMO-MP-001及客戶維多利亞酒店；點擊「查看報告」；核對詳情標題、工單號與客戶欄位。",
      "severity": "P2",
      "screenshotCell": "=HYPERLINK(\"screenshots/PAGE-034_TC-003_FAIL.png\",\"查看原圖\")",
      "status": "待處理",
      "expectedActual": "預期：詳情可核對來源列的報告編號及名稱，其他關聯資料屬於同一筆報告。實際：客戶及工單號相符，但詳情不顯示CP-CP-DEMO-MP-001，只顯示「SR」及工單編號。",
      "thumbnailCell": "",
      "screenshots": [
        "outputs/2026-11-07-luna-qa/screenshots/PAGE-034_TC-003_FAIL.png"
      ],
      "sheet": "01_問題彙總",
      "row": 46,
      "relatedCaseIds": [
        "PAGE-034_TC-003"
      ]
    }
  ]
}
;
