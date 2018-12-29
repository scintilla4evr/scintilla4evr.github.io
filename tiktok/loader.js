var assetsLoaded = 0, assetsToLoad = 14

document.querySelectorAll("audio, video").forEach(e => {
	e.addEventListener("canplaythrough", function() {
		assetsLoaded++
		document.querySelector("div.progress div").style.width = (256 * assetsLoaded / assetsToLoad) + "px"
		
		if (assetsLoaded == assetsToLoad) {
			document.querySelector("div.loader").style.display = "none"
			document.querySelector("button").style.display = "block"
		}
	})
})