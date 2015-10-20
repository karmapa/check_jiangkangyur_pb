# check_jiangkangyur_pb
check pb order and pb tag format in jiangkangyur

1 git clone this check_jiangkangyur_pb folder next to jiangkangyur folder

clone 或下載 check_jiangkangyur_pb 資料夾，和jiangkangyur 資料夾放在一起，如下圖
![1](https://cloud.githubusercontent.com/assets/13195099/10474123/61878c62-7265-11e5-8bde-54aebc401a81.JPG)

2 open cmd under check_jiangkangyur_pb forder

把滑鼠移到 check_jiangkangyur_pb 資料夾，按shift鍵 同時按滑鼠右鍵，點 "在此處開啟命令視窗"
![2](https://cloud.githubusercontent.com/assets/13195099/10474207/685323ca-7266-11e5-8906-bd6d078533c9.jpg)

3 type node checkpb20151013.js

在命令列視窗輸入 node checkpb20151013.js，按enter 開始檢查pb tag
![3](https://cloud.githubusercontent.com/assets/13195099/10474245/1176ef68-7267-11e5-87bc-0b8ea05d9fb0.JPG)

如果輸入 node checkpb20151013.js 後出現 Cannot find module 'glob'(如下圖)，請重新輸入 npm i glob，按enter，等命令列跑完，再輸入 node checkpb20151013.js ，再按enter即可
![default](https://cloud.githubusercontent.com/assets/13195099/10603974/e4a3aac0-7753-11e5-872a-5f3db9a1913c.JPG)

![2](https://cloud.githubusercontent.com/assets/13195099/10603979/ef04d3cc-7753-11e5-9939-4808aca134f7.JPG)

4 開始檢查pb tag

![4](https://cloud.githubusercontent.com/assets/13195099/10474265/52a918c6-7267-11e5-9a10-83c6257c9243.JPG)

5 錯誤類型

如果沒有解釋，表示pb id跳號或順序不對

如果顯示"wrong pb tag format"，表示pb id格式不像 \<pb id="1.1a"/\>，可能 "符號打錯 或 少打 = / 或 多空格少空格等等

顯示pb id not start from "0a" or "1a"，表示該pb id是volumn的第一個檔案的第一個pb id，這個pb id不是從 0a 或 1a 開始

![6](https://cloud.githubusercontent.com/assets/13195099/10474488/da41c72c-7269-11e5-97d2-0cbe989398af.JPG)

