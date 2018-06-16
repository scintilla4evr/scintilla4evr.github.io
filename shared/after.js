window.SITE_TITLE = "scintilla4evr";
window.SITE_AUTHOR = "scintilla4evr";

window.SITE_ALLOWXHRCACHE = false;

(function() {
	function xmlFromURL(url) {
		var tname = url.hash.match(/[\?\&]p=([a-z0-9\.]+)/i);
		if (!tname) tname = url.search.match(/[\?\&]p=([a-z0-9\.]+)/i); // fake it!
		if (!tname) tname = [0, "index"]; // fake it!

		return xmlFromPageName(tname[1]);
	}

	function xmlFromPageName(name) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.open("GET", "pages/" + name + ".xml", true);

			xhr.responseType = "document";
			xhr.overrideMimeType("text/xml");

			if (!SITE_ALLOWXHRCACHE) {
				xhr.setRequestHeader("cache-control", "no-cache, must-revalidate, post-check=0, pre-check=0");
				xhr.setRequestHeader("cache-control", "max-age=0");
				xhr.setRequestHeader("expires", "0");
				xhr.setRequestHeader("expires", "Tue, 01 Jan 1980 1:00:00 GMT");
				xhr.setRequestHeader("pragma", "no-cache");
			}

			xhr.onload = function() {
				if (xhr.readyState === xhr.DONE && xhr.status === 200) {
					resolve(xhr.responseXML);
				} else {
					reject();
				}
			}

			xhr.send();
		});
	}

	function processXML(xml) {
		function processLink(link, item) {
			if (item.getAttribute("type") == "page") {
				link.scLinkOptions = {
					"anchor": item.getAttribute("target")
				};
				link.addEventListener("click", function() {
					location.href = "#" + this.scLinkOptions.anchor;
				});
			} else if (item.getAttribute("type") == "external") {
				link.scLinkOptions = {
					"url": item.getAttribute("target")
				};
				link.addEventListener("click", function() {
					location.href = this.scLinkOptions.url;
				});
			} else if (item.getAttribute("type") == "internal") {
				link.scLinkOptions = {
					"page": item.getAttribute("target")
				};
				link.addEventListener("click", function() {
					location.href = "?p=" + this.scLinkOptions.page;
				});
			}
		}

		window.XMLTest = xml;

		// Page title
		if (xml.querySelector("page").getAttribute("home")) {
			document.title = SITE_TITLE;
			document.querySelector("header > main").style.display = "none";
		} else
			document.title = xml.querySelector("page title").textContent + " - " + SITE_TITLE;

		document.querySelector("header > main > h1").innerText = xml.querySelector("page title").textContent;

		// Create page sections
		var anchorCounter = 1;
		for (var item of xml.querySelectorAll("page layout *")) {
			if (item.getAttribute("id")) {
				var anchor = document.createElement("a");
				anchor.name = item.getAttribute("id");
				document.body.appendChild(anchor);
			}

			if (item.tagName == "section") {
				var section = document.createElement("section");

				var h1 = document.createElement("h1");
				h1.innerText = item.getAttribute("title");
				section.appendChild(h1);

				var content = document.createElement("content");

				for (var block of item.children) {
					var blockDiv = document.createElement("div");

					if (block.tagName == "markdown")
						blockDiv.innerHTML = markdown.toHTML(block.textContent);
					else if (block.tagName == "carousel") {
						blockDiv.classList.add("carousel");

						for (var l of block.children) {
							var clink = document.createElement("div");

							if (l.getAttribute("img")) {
								clink.style.backgroundImage = "url(\"" + l.getAttribute("img") + "\")";
							}

							clink.innerText = l.textContent;
							processLink(clink, l);

							blockDiv.appendChild(clink);
						}
					}

					content.appendChild(blockDiv);
				}
				section.appendChild(content);

				document.body.appendChild(section);
			} else if (item.tagName == "header") {
				if (item.querySelector("title"))
					document.querySelector("header > main > h1").innerText = item.querySelector("title").textContent;

				if (item.querySelector("sub")) {
					var sub = document.createElement("h2");
					sub.innerText = item.querySelector("sub").textContent;
					document.querySelector("header > main").appendChild(sub);
				}

				if (item.querySelector("img")) {
					document.querySelector("header").classList.remove("compact");
					document.querySelector("header > main").style.backgroundImage = "url(\"" + item.querySelector("img").getAttribute("src") + "\")";
				}
			}
		}

		// Create header links
		if (xml.querySelector("page links")) {
			for (var item of xml.querySelectorAll("page links link")) {
				var link = document.createElement("section");

				var linkText = document.createElement("p");
				linkText.innerText = item.textContent;
				link.appendChild(linkText);

				processLink(link, item);

				if (item.getAttribute("style")) link.classList.add(item.getAttribute("style"));

				document.querySelector("body > header > div.sectionScroller").appendChild(link);
			}
		}

		// Create a footer
		var footer = document.createElement("footer");
		footer.innerText = SITE_AUTHOR + ", " + (new Date()).getFullYear();
		document.body.appendChild(footer);

		document.body.classList.remove("loading");
	}

	// Load the current page
	xmlFromURL(location).then(processXML, function() {
		// Page not found
		xmlFromPageName("notfound").then(processXML);
	});
})();