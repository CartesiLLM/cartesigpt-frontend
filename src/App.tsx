// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import { FC, SyntheticEvent } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import { useState } from "react";

import { GraphQLProvider } from "./GraphQL";
import { Notices } from "./Notices";
import { Input } from "./Input";
import { Inspect } from "./Inspect";
import { Network } from "./Network";
import { Vouchers } from "./Vouchers";
import { Reports } from "./Reports";
import configFile from "./config.json";
import Gpt from "./Gpt";

const config: any = configFile;

const injected: any = injectedModule();
init({
    wallets: [injected],
    chains: Object.entries(config).map(([k, v]: [string, any], i) => ({ id: k, token: v.token, label: v.label, rpcUrl: v.rpcUrl })),
    appMetadata: {
        name: "Cartesi Rollups Test DApp",
        icon: "<svg><svg/>",
        description: "Demo app for Cartesi Rollups",
        recommendedInjectedWallets: [
            { name: "MetaMask", url: "https://metamask.io" },
        ],
    },
});

const App: FC = () => {
    const [dappAddress, setDappAddress] = useState<string>("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");


    const QUESTION = [
        {
            ques: "Who are you?",
            ans: "I am Cartesi GPT"
        },
        {
            ques: "How old are you?",
            ans: "Heyo, I am a machine Learning model, I was trained to help you out. You don't need my age"
        },
        {
            ques: "Thank you",
            ans: "You are welcome"
        }
    ]
    const [question, setQuestion] = useState("")
    const [text, setText] = useState("")
    const [answers, setAnswers] = useState<any>([]);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        // Find a match based on the user's input
        const matchingQuestion = QUESTION.find((q) => q.ques.toLowerCase() === question.toLowerCase());
        let newAnswer: any = []

        // If a match is found, set the corresponding answer
        if (matchingQuestion) {
            newAnswer = { question: question, answer: matchingQuestion.ans };
        } else {
            // Handle the case when no match is found
            newAnswer = { question: question, answer: "Sorry, I don't understand that question" };
        }

        // Update the state with the new answer object
        setAnswers((prevAnswers: any) => [...prevAnswers, newAnswer]);

        // Clear the input field
        setText("");

    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed!');
            setQuestion(text)
        }
    };

    return (
        <div>
            <div className="p-4 flex justify-between bg-[#1E293B] text-white">
                <h1 className='text-center text-[24px] font-semibold ml-3'>CartesiGPT</h1>
                <Network />
            </div>
            <GraphQLProvider>
                {/* <div>
                    Dapp Address: <input
                        type="text"
                        value={dappAddress}
                        onChange={(e) => setDappAddress(e.target.value)}
                    />
                    <br /><br />
                </div> */}
                {/* <h2>Inspect</h2>
                <Inspect />
                <h2>Reports</h2>
                <Reports />
                <h2>Notices</h2>
                <Notices />
                <h2>Vouchers</h2>
            <Vouchers dappAddress={dappAddress} /> */}
                {/* <h2>Input</h2>
            <Input dappAddress={dappAddress} /> */}

                <Gpt />
            </GraphQLProvider>
        </div>
    );
};

export default App;
