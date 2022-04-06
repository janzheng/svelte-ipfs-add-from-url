// import { getSubmissionById } from '@lib/project/board/submissions';

import { create, urlSource } from 'ipfs-http-client'
const ipfs = create('https://ipfs.infura.io:5001/api/v0')


export const get = async ({url}) => {
  // let data = await getSubmissionById(params.id)
  let src = url.searchParams.get('src')


  // const file = "lol"
  const file = await ipfs.add(urlSource(src))
  console.log('file: ',file)


  return {
    body: file,
  };
};
