import React, { SyntheticEvent, useState } from 'react'

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

const Gpt = () => {
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
        <div className='flex w-full min-h-[92vh]'>
            <div className="w-[20%] bg-[#1E293B] text-white">
                {/* <h1 className='text-center mt-4 text-[24px] font-semibold'>CartesiGPT</h1> */}
            </div>
            <div className="w-[80%]">

                <div className="mx-3 mt-5 pb-5 max-h-[85%] overflow-y-scroll">

                    {
                        answers.map((answer: any, i: any) => (
                            <div className="mb-3" key={i}>
                                <div className="font-bold">{answer?.question}</div>
                                <div className="">{answer?.answer}</div>
                            </div>
                        ))
                    }
                </div>


                <div className="fixed flex bottom-4 w-[80%]">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={text}
                            className='border border-[#2D4258] outline-none min-w-[90%] mx-3 rounded-lg h-[48px] px-3'
                            placeholder='Enter text'
                            onKeyDown={handleKeyPress}
                            onChange={(e: any) => setText(e.target.value)}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Gpt