import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Fade,
  Flex,
  Input,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [qrCodeResult, setQrCodeResult] = useState<string>();
  const [text, setText] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const qrCodeProps = {
    width: "100%",
  };

  const loadLocalStorageText = () => {
    const localStorageText = localStorage.getItem("text");
    setText(localStorageText ?? "");
  };

  const saveTextOnStorage = async () => {
    localStorage.setItem("text", text);

    setShowAlert(true);
    await delay(2000);
    setShowAlert(false);
  };

  const clearLocalStorageText = () => {
    localStorage.setItem("text", "");
  };

  return (
    <Tabs isFitted variant="enclosed" bgColor="#1f2428">
      <TabList>
        <Tab color="#f1f1f1">Local Storage</Tab>
        <Tab color="#f1f1f1">QrCode</Tab>
      </TabList>

      <TabPanels w="100%" justifyContent="center" alignItems="center">
        <TabPanel p="0">
          <Flex
            w="100%"
            h="96vh"
            bgColor="#24292e"
            justifyContent="center"
            alignItems="center"
            direction="column"
            gap="5"
          >
            <Fade in={showAlert}>
              <Alert
                status="success"
                w={["100%", "100%", "400px", "400px"]}
                borderRadius="6px"
                shadow="lg"
              >
                <AlertIcon />
                Text save successfully.
              </Alert>
            </Fade>

            <Flex
              w={["90%", "80%", "400px", "400px"]}
              border="1px"
              borderRadius="6px"
              borderColor="gray"
              shadow="lg"
              h="70px"
              align="center"
              bgColor="#1f2428"
              justifyContent="center"
            >
              {text ? (
                <Text
                  w="100%"
                  textAlign="center"
                  fontSize="32px"
                  color="#f1f1f1"
                  fontWeight="bold"
                >
                  {text}
                </Text>
              ) : (
                <Text
                  w="100%"
                  textAlign="center"
                  fontSize="32px"
                  color="gray"
                  fontWeight="bold"
                >
                  Sem resultado
                </Text>
              )}
            </Flex>
            <Flex
              w={["90%", "80%", "400px", "400px"]}
              direction="column"
              justifyContent="center"
              alignItems="center"
              padding="6"
              gap="2"
              border="1px"
              borderRadius="6px"
              borderColor="gray"
              shadow="lg"
              bgColor="#1f2428"
            >
              <Input
                shadow="md"
                placeholder="Your text"
                onChange={(value: any) => setText(value?.target?.value)}
                value={text}
                color="#f1f1f1"
              />
              <Button w="100%" shadow="md" onClick={saveTextOnStorage}>
                Save
              </Button>
              <Divider w="95%" mt="5px" mb="5px" />
              <Button
                w="100%"
                shadow="md"
                variant="outline"
                color="#f1f1f1"
                _hover={{ backgroundColor: "#22262c" }}
                onClick={() => {
                  loadLocalStorageText();
                }}
              >
                Load
              </Button>
              <Button
                w="100%"
                shadow="md"
                variant="outline"
                color="#f1f1f1"
                _hover={{ backgroundColor: "#22262c" }}
                onClick={() => {
                  setText("");
                  clearLocalStorageText();
                }}
              >
                Clear
              </Button>
            </Flex>
            <Text color="#f1f1f1" mt="30px">
              version 0.5.0
            </Text>
            <Link href="app://myapp" color="#fff">
              Hello
            </Link>
          </Flex>
        </TabPanel>
        <TabPanel p="0">
          <Flex
            w="100%"
            h="96vh"
            bgColor="#24292e"
            justifyContent="center"
            alignItems="center"
            direction="column"
            gap="5"
          >
            <Flex
              w={["80%", "50%", "20%", "20%"]}
              h="auto"
              direction="column"
              border="1px"
              borderColor="gray"
              borderRadius="8px"
            >
              <QrReader
                onResult={(result: any, error: any) => {
                  if (!!result) {
                    setQrCodeResult(result?.text);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                constraints={{ facingMode: "user" }}
                {...qrCodeProps}
              />
            </Flex>
            <Text fontSize="32px" fontWeight="bold" color="#f1f1f1">
              {qrCodeResult ?? "Sem resultado"}
            </Text>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
