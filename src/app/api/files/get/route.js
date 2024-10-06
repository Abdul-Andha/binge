import { pinata } from "@/app/utils/config";

async function GET() {
  try {
    const data = await pinata.gateways.get("bafybeieonk542hkdm252ycxznk62xtvqzrckuoh5sprj7iwcngnc6fayea");
    console.log(data)

    const url = await pinata.gateways.createSignedURL({
       	cid: "bafybeieonk542hkdm252ycxznk62xtvqzrckuoh5sprj7iwcngnc6fayea",
    	expires: 1800,
    })
    console.log(url)
    return {
      url: url, 
      data: data
    }
  } catch (error) {
    console.log(error);
  }
}

main();
