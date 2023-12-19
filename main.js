import { MessageBuilder, Webhook } from "discord-webhook-node";
import { parseXML } from "./parseXML.js";

async function main() {
    const WEBHOOK_URL = ""
    const NATION = ""
    const AT = ""

    if (!WEBHOOK_URL || !NATION || !AT) {
        console.log("Required parameters missing")
        return
    }

    const hook = new Webhook(WEBHOOK_URL)

    const actives = await parseXML(`https://www.nationstates.net/cgi-bin/api.cgi?q=cards+asksbids;nationname=${NATION}`, NATION)
    const toTrack = []

    const asks = actives.CARDS.ASKS.ASK
    if (Array.isArray(asks)) {
        asks.forEach(ask => toTrack.push({ id: ask.CARDID, season: ask.SEASON, type: "ask" }))
    } else {
        if (asks) toTrack.push({ id: asks.CARDID, season: asks.SEASON, type: "ask" })
    }

    const bids = actives.CARDS.BIDS.BID
    if (Array.isArray(bids)) {
        bids.forEach(bid => toTrack.push({ id: bid.CARDID, season: bid.SEASON, type: "bid" }))
    } else {
        if (bids) toTrack.push({ id: bids.CARDID, season: bids.SEASON, type: "bid" })
    }

    const auction = await parseXML('https://www.nationstates.net/cgi-bin/api.cgi?q=cards+auctions', NATION)

    const market = auction.CARDS.AUCTIONS.AUCTION
    if (Array.isArray(market)) {
        market.forEach(transaction => {
            toTrack.find(card => {
                if (card.id === transaction.CARDID) {
                    const embed = new MessageBuilder()
                        .setTitle(":money_with_wings: AUCTION NOTICE :money_with_wings: :exclamation:")
                        .setFooter("By Kractero", "https://www.nationstates.net/images/flags/uploads/kractero__558435.png", "https://nationstates.net/nation=Kractero")
                        .setURL(`https://www.nationstates.net/page=deck/card=${card.id}/season=${card.season}`)
                        .setDescription(`@${AT} [S${card.season} ${card.id}](https://www.nationstates.net/page=deck/card=${card.id}/season=${card.season}) which you have an active ${card.type} for is on auction.`)
                        .setTimestamp()
                    hook.send(embed)
                }
            })
        })
    }
}

await main()