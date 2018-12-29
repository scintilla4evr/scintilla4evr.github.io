var index = 0;

function getVideo(i) {
	var vid = document.createElement("video")
	vid.src = document.querySelectorAll("div.video video")[i].src
	return vid
}

function playAudio(i) {
	document.querySelectorAll("div.audio audio")[i].play()
}

function startTikTok() {
	if (index < 2) {
		// Side by side, no scaling
		var vid = getVideo(index)
		document.querySelector("div.first").appendChild(vid)
		playAudio(index)
		vid.play()
	} else {
		// Subs, scale the previous ones down

		// Cleanup - get rid of something down the line
		var farfaraway = document.querySelector("main > div.sub > div.sub > div.sub > div.sub > div.sub > div.sub")
		if (farfaraway)
			farfaraway.parentNode.removeChild(farfaraway)
		
		// First, create a sub
		var sub = document.createElement("div")
		sub.className = "sub"
		
		// Get the whole snake from main
		var whole = document.querySelector("main").children[0]
		document.querySelector("main").removeChild(whole)
		
		// Put the stuff in the sub
		sub.appendChild(whole)
		
		// Get the next AV index
		var avIndex = (index - 1) % 6 + 1
		var vid = getVideo(avIndex)
		
		// Put the video
		sub.appendChild(vid)
		
		// Put the stuff back together
		document.querySelector("main").appendChild(sub)
		console.log(1)
		
		playAudio(avIndex)
		vid.play()
	}
	
	index++
	document.querySelector("footer h1").innerText = "#" + index
	
	setTimeout(startTikTok, 2400)
}

document.querySelector("button").addEventListener("click", function() {
	this.style.display = "none"
	startTikTok()
})