// import { getSubmissionById } from '@lib/project/board/submissions';

import { create, urlSource } from 'ipfs-http-client'
const ipfs = create('https://ipfs.infura.io:5001/api/v0')


export const get = async ({url}) => {
  // let data = await getSubmissionById(params.id)
  let src = url.searchParams.get('src')


  // const file = "lol"
  let file = await ipfs.add(urlSource(src))
  let cid_str = file.cid.toString()
  file['cid_str'] = cid_str
  file['ipfs'] = 'https://ipfs.io/ipfs/' + cid_str
  file['cloudflare'] = 'https://cloudflare-ipfs.com/ipfs/' + cid_str
  console.log('file: ', file)


  return {
    body: file,
  };
};



/*
https://pbs.twimg.com/card_img/1510061803916648467/Y5anBNCB?format=jpg&name=small,
https://pbs.twimg.com/media/FPo0urTWQAYxmKF?format=jpg&name=small
*/

export const post = async ({ request }) => {
  const input = await request.json();
  const src = input['src']
  const sources = input['sources']

  // one request, in "src" 
  if(src) {
    // const file = "lol"
    let file = await ipfs.add(urlSource(src))
    let cid_str = file.cid.toString()
    file['cid'] = cid_str
    file['ipfs'] = 'https://ipfs.io/ipfs/' + cid_str
    file['cloudflare'] = 'https://cloudflare-ipfs.com/ipfs/' + cid_str
    console.log('file: ', file)
  
    return {
      body: file,
    };
  } else {
    // array of URLs
    console.log('sources:', sources)

    if(sources.length && sources.length == 0)
      return {}
      
    let _files = []

    _files = sources.map(async src => {
      return await ipfs.add(urlSource(src))
    })

    let files = []
    await Promise.all(_files).then(data => {

      data.map(async file => {
        let cid_str = file.cid.toString()
        file['cid'] = cid_str
        file['ipfs'] = 'https://ipfs.io/ipfs/' + cid_str
        file['cloudflare'] = 'https://cloudflare-ipfs.com/ipfs/' + cid_str
        files.push(file)
      })

      console.log('[files]', files)
      
    })
    
    return {
      body: files,
    };
  }
};
