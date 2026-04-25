# Deployment Guide

Ped Pearls は **GitHub Actions による自動デプロイ** に切り替わっています。`main` ブランチへ push すると自動的にビルドして GitHub Pages へ公開されます。

---

## 1. GitHub Pages の初期設定（最初の1回のみ）

リポジトリの **Settings → Pages** を開き、**Build and deployment → Source** を `GitHub Actions` に切り替えるだけです（`Deploy from a branch` ではなく `GitHub Actions` モードを使います）。これで `.github/workflows/deploy.yml` が自動的にデプロイ先となります。

加えて **Settings → Actions → General → Workflow permissions** を `Read and write permissions` にしてください。

---

## 2. 通常のリリース手順

```bash
git add .
git commit -m "fix: update dexamethasone PONV dose to 0.4 mg/kg"
git push origin main
```

push 後の流れ:
1. **GitHub Actions** が `Build & Deploy to GitHub Pages` ワークフローを起動 (`.github/workflows/deploy.yml`)
2. `npm ci` → `npm test` → `npm run build` を実行
3. テストが通れば `dist/` を artifact 化して `actions/deploy-pages@v4` で公開
4. リポジトリの **Actions** タブにグリーン ✓ が出れば成功

公開 URL は `https://shinyaito28.github.io/Ped-pearls/` です（`vite.config.js` の `base: '/Ped-pearls/'` がこのパス用です）。

---

## 3. プルリクエスト時の自動チェック

`.github/workflows/ci.yml` が PR と非 main ブランチ push で動き、以下を実行します:
- `npm ci`
- `npm run lint --if-present`
- `npm test`
- `npm run build`

レッドが出たマージは止めてください（必要なら GitHub の Branch protection rule で必須化）。

---

## 4. ローカル開発

```bash
npm install        # 初回のみ
npm run dev        # http://localhost:5173 で起動
npm test           # 単体テスト (vitest)
npm run test:watch # 変更時に自動再実行
npm run build      # dist/ に本番ビルド
npm run preview    # ローカルで dist/ をプレビュー
```

---

## 5. iPhone へのインストール (PWA)

公開後の URL（例: `https://shinyaito28.github.io/Ped-pearls/`）に **iPhone Safari** でアクセスし、

1. 画面下部の「共有」アイコン（四角＋上向き矢印）をタップ
2. メニューを下にスクロールして **「ホーム画面に追加」** をタップ
3. 右上の「追加」をタップ

ホーム画面のアイコンから起動するとアドレスバーが消えた **standalone** アプリになります。一度読み込めば service worker がオフラインキャッシュを保持するので、機内モードでも動作します。

ヘッダーの Theme トグル (Auto / Light / Dark) は iOS のステータスバー色も追従して切り替えます。

---

## 6. （補足）Vercel を使う場合

GitHub Actions 化以前の手順を残しておきます。GitHub に push せずに公開したい時にどうぞ:

1. ターミナルで `npm run build` を実行
2. `dist` フォルダが作成される
3. [vercel.com](https://vercel.com) にログインし、`Add New Project → Upload` を選んで `dist` フォルダをドラッグ＆ドロップ
4. 公開 URL が払い出される

ただし継続運用なら GitHub Actions の方が（コミット履歴と自動デプロイが揃うため）推奨です。

---

## 7. トラブルシューティング

| 症状 | 対処 |
|---|---|
| Actions が `403 Permission denied` | Settings → Actions → General → Workflow permissions を `Read and write permissions` に |
| Pages の `Source` が `Deploy from a branch` のまま | `GitHub Actions` に変更 (上記セクション 1) |
| アセットが 404 (CSS/JS が読めない) | `vite.config.js` の `base` がリポジトリ名と一致しているか確認 (`/Ped-pearls/`) |
| iPhone で更新が反映されない | ホーム画面アイコンを長押し→削除→追加し直し (service worker の再キャッシュ) |
