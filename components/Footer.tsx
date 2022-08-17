import { Button, HStack, VStack } from "@chakra-ui/react"
import colors from "../lib/colors";

const Footer = () => {
    return (
        <footer>
            <VStack>
                <HStack>
                    <img
                        src="https://ipfs.io/ipfs/QmPzeKT3ia8jmFSAQrQASAPrvvgFTVqAQz8mc9Qv9V2oHw?filename=Avatar2.jpg"
                        alt="Avatar2"
                        width="64px"
                        height="64px"
                        style={{
                            borderRadius: "50%",
                            marginTop: "16px",
                            marginBottom: "16px"
                        }}
                    />
                </HStack>
                <p>Created by <a target="_blank" href="https://www.linkedin.com/in/mrgwiz">
                    <Button variant={"link"} color={colors.red}>mrgwiz</Button>
                </a></p>
                <p>Open Source on <a target="_blank" href="https://github.com/mrgwiz">
                    <Button variant={"link"} color={colors.orange}>GitHub</Button>
                </a></p>
            </VStack>
        </footer>
    );
}

export default Footer;