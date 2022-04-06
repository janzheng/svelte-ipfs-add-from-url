

<article class="_content">

  <div class="flex justify-center">
    <div class="w-1/2 flex flex-col pb-12">
      <input
        placeholder="Image / Attachment / File URL"
        class="mt-8 border rounded p-4"
        bind:value={src}
      />
      <textarea
        id="output"
        bind:value={sources}
        placeholder="Many Image / Attachment / File URLs, separated by commas!"
        class="_form-textarea mt-8 border rounded p-4"
        rows="6"
      ></textarea>
      <button on:click="{getIPFS}" class="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
        Get IPFS
      </button>

      {#if res_json}
        <pre>{JSON.stringify(res_json,null,2)}</pre>
      {/if}

    </div>
  </div>

</article>







<script>

  export let src, sources, res_json

  let client, nodeId
  // let client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')



  async function getIPFS() {
    try {
      // post new submission to board
      const res = await fetch(
        `/add`, 
        {
          headers: {'Content-Type': 'application/json',},
          method: 'POST',
          body: JSON.stringify({
            src,
            sources: sources.trim().split(/\s*,\s*/)
          })
        })
      if (res.ok) {
        res_json = await res.json()
      }
    } catch (error) {
      console.log('Error getting IPFS: ', error)
    }
  }


</script>