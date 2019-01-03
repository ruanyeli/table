	if (!count) {//没有语法错误时，运行一下代码
		for (var i = 0; i < codestr.length; i++) {
			if (codestr[i] == "IronMan.goRight()" || codestr[i] == "IronMan.goright()") {
				if (goTest("right")) {
					timer = setTimeout(function () {
						goRight()
					}, i * 1000);
				} else {
					timer = setTimeout(function () {
						// error.innerHTML = "哎哟，小朋友，路径出错了哦，修改路径重新运行";
						errorTime++;
						reset(0);
					}, i * 1500);
					break
				};
			} else if (codestr[i] == "IronMan.goLeft()" || codestr[i] == "IronMan.goleft()") {
				if (goTest("left")) {
					timer = setTimeout(function () {
						goLeft()
					}, i * 1000);
				} else {
					timer = setTimeout(function () {
						// error.innerHTML = "哎哟，小朋友，路径出错了哦，修改路径重新运行";
						errorTime++;
						reset(0);
					}, i * 1500);
					break;
				}
			} else if (codestr[i] == "IronMan.goDown()" || codestr[i] == "IronMan.godown()") {
				if (goTest("down")) {
					timer = setTimeout(function () {
						goDown()
					}, i * 1000);
				} else {
					timer = setTimeout(function () {
						// error.innerHTML = "哎哟，小朋友，路径出错了哦，修改路径重新运行";
						errorTime++;
					s	reset(0);
					}, i * 1500);
					break;
				}
			} else if (codestr[i] == "IronMan.goUp()" || codestr[i] == "IronMan.goup()") {
				if (goTest("up")) {
					timer = setTimeout(function () {
						goUp()
					}, i * 1000);
				} else {
					timer = setTimeout(function () {
						// error.innerHTML = "哎哟，小朋友，路径出错了哦，修改路径重新运行";
						errorTime++;
						reset(0);
					}, i * 1500);
					break;
				}
			} else if (codestr[i] == "IronMan.push()" || codestr[i] == "IronMan.push()") {
				timer = setTimeout(function () {
					push("down");
				}, i * 1000);
			}
		}
	}