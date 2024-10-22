<script lang="ts">
	import { page } from '$app/stores';
	import {NPool, NRelay1} from "@nostrify/nostrify";
	import {browser} from "$app/environment";


	type ReceiptReference = {
		receiptEventId: string,
		pubkey: string,
		privateKey: string,
		relay: string,
	}

	// let newReceiptReference: ReceiptReference = {
	// 	receiptEventId: "e15a7787b67f41a08ad4feec314dbd3b45d021ecc39a150b0d89a1389fe9b1ff",
	// 	pubkey: "13c5231ece335f39bd0a464646c5c9adec37abe08c883b73753bc8a288595764",
	// 	privateKey: "927ecb98a00928684d79e90e70fcfc02395f9655f786e85420a5efd371f39dc4",
	// 	relay: "wss://relay.damus.io"
	// }
	// const newReceiptUrl = `https://192.168.1.252:5173/${btoa(JSON.stringify(newReceiptReference))}`;
	// console.log(newReceiptUrl);

	let urlReceiptRef: string;
	urlReceiptRef = $page.params.receipt;
	let receiptReference: ReceiptReference = JSON.parse(atob(urlReceiptRef));

	let receiptEvent: object;
	let lineItemEvents: object[] = [];
	let paymentEvents: object[] = [];

	$:receiptEvent = receiptEvent
	$:lineItemEvents = lineItemEvents
	$:paymentEvents = paymentEvents

	async function handleEvent(event){
		console.log(event);

		if(event.kind === 90000){
			receiptEvent = event;
			return;
		}

		if(event.kind === 90001){
			lineItemEvents = lineItemEvents.concat(event);
			return;
		}

		if(event.kind === 90001){
			paymentEvents = paymentEvents.concat(event);
			return;
		}

		console.log(event);
	}

	async function loadReceipt() {
		console.log(`connecting to relay ${receiptReference.relay}`);
		const relay = new NRelay1(receiptReference.relay);

		let filters = [
			{
				kinds: [
					90000
				],
				ids: [receiptReference.receiptEventId],
				authors: [receiptReference.pubkey],
				limit: 1
			},
			{
				kinds: [
					90001
				],
				authors: [receiptReference.pubkey],
				limit: 1,
				"#e": [receiptReference.receiptEventId]
			},
			{
				kinds: [
					90002
				],
				authors: [receiptReference.pubkey],
				limit: 1,
				"#e": [receiptReference.receiptEventId]
			},
		]

		for await (const msg of relay.req(filters, {})) {
			if (msg[0] === 'EVENT') {
				await handleEvent(msg[2])
			}
			if (msg[0] !== 'EOSE') {
				console.log(`No more historic messages`)
			}
		}
	}

</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Receipt info</h1>


	{#if browser}
		{#if receiptEvent}
			<h1>Receipt message</h1>
			{receiptEvent.content}

			<h1>Items</h1>
			<table>
				<tr>
					<th>Item</th>
					<th>Price/piece</th>
					<th>Quantity</th>
				</tr>
			</table>
			{#each lineItemEvents as lineItemEvent}
				<tr>
					<td>{lineItemEvent.content}</td>
					<td>999</td>
					<td>1</td>
				</tr>
			{/each}

		{/if}
		{#await loadReceipt()}
		{:then x}
			<p>The receipt is {x}</p>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}


	<br>
	<br>
	<br>
	<h1>json</h1>
<!--	<p>{newReceiptUrl}</p>-->
	{JSON.stringify(receiptReference, null, 2)}


</div>