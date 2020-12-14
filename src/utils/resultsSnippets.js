const resultsSnippet = (hit) => {
		const snippets = [],
			checkLevel = (results) => Object.keys(results).forEach((key) => {
				const section = results[key];
				if (section.matchLevel) {
					if (section.matchLevel == `full`) {
						snippets.push(highlight(section.value));
					}
				} else if (typeof section === `object`) {
					checkLevel(section);
				}
			});

		if (hit._snippetResult && typeof hit._snippetResult === `object`) {
			checkLevel(hit._snippetResult);
		}

		return snippets;
	},

	highlight = (string) => (string.replace(/<ais-highlight-0000000000>/g, `<mark>`).replace(/<\/ais-highlight-0000000000>/g, `</mark>`));

module.exports = resultsSnippet;
