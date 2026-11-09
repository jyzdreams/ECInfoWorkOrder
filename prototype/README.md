# ECInfoTech 品牌版当前原型

本目录是当前原型入口，页面采用 EC InfoTech 品牌视觉。页面、字段、Mock 数据、流程、角色权限及交互以本目录代码为准。

## 隔离 Mock 预览

从项目根目录运行：

```sh
python3 prototype/serve-mock.py 18861
```

浏览器访问 <http://127.0.0.1:18861/>。该服务只绑定本机，不读取凭证、不调用宜搭；MR 提交使用内存 Mock 回执。页面里沿用的真实仓库通说明不代表本地 Mock 服务写入了真实仓库。

演示请使用 `serve-mock.py`。本目录同时保留的 `server.py` 是原型既有真实仓库代理，可能写入宜搭，不用于隔离 Mock 演示。

## 品牌资源

- 设计 Token、共用组件与响应式样式：`ec-brand.css`
- EC InfoTech Logo 资源：`assets/ecinfo-official.svg`
- 同步基准、页面清单及验证记录：[EC 品牌版原型结果](../docs/review/2026-11-06-ec-brand-v1/RESULT.md)

此目录用于原型评审，不代表客户批准、业务验收或生产发布。

## Mobile 獨立入口（2026-11-07）

沿用上述隔離 Mock HTTP 服務：

- PC：<http://127.0.0.1:18861/>
- Mobile：<http://127.0.0.1:18861/mobile/>
- 本輪已啟動的評審服務：<http://127.0.0.1:18867/mobile/>

兩端程式及本機儲存鍵分開；移動端不引用 PC 執行腳本或遠端接口。可將 prototype/ 作為靜態網站根目錄透過 HTTP／HTTPS 提供，mobile/ 使用相對資源及 hash 路由；不要使用 file://。目前服務只綁定本機；實體手機及遠端客戶需要由獲授權的主機另行提供 HTTP／HTTPS，本輪未發布 Pages。

Mobile 預設為周師傅，右上身份或「我的」切換十類演示身份。先從工作台進入 P 任務，接單、到場、填 CP、手寫簽名、提交；切換主管在待辦核對確認，再以財務查閱本次完成。M 任務填 SR，可新增多行報價需求，提交後報價組在公共待辦查看。草稿、照片及簽名僅本機保存；「我的」可重設手機演示。

[手機使用說明](mobile/README.md) · [PC／Mobile 映射](../docs/review/2026-11-07-mobile/PC-MOBILE-MAPPING.md) · [交付與測試](../docs/review/2026-11-07-mobile/RESULT.md)
