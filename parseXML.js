import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({ ignoreAttributes: false });

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function parseXML(url, userAgent) {
	const headers = {
		'User-Agent': userAgent
	};

	const response = await fetch(url, {
		method: 'GET',
		headers
	});

	if (response.status === 429) {
		await sleep(Number(response.headers.get('retry-after')) * 1000 + 2000)
		return await parseXML(url, userAgent)
	}

	const xml = await response.text();
	const xmlObj = parser.parse(xml);
	return xmlObj;
}