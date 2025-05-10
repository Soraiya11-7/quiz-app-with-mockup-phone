import { useState, useEffect } from 'react';

const useFetchQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // const response = await fetch('https://opentdb.com/api.php?amount=10');
        // const data = await response.json();
        
        // Mock data for demonstration (10 questions).......
        const mockQuestions = [
          {
            id: 1,
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: "Paris"
          },
          {
            id: 2,
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars"
          },
          {
            id: 3,
            question: "What is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            correctAnswer: "Blue Whale"
          },
          {
            id: 4,
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: "Leonardo da Vinci"
          },
          {
            id: 5,
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: "Au"
          },
          {
            id: 6,
            question: "Which language is used primarily for web development?",
            options: ["Java", "C++", "Python", "JavaScript"],
            correctAnswer: "JavaScript"
          },
          {
            id: 7,
            question: "What is the tallest mountain in the world?",
            options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
            correctAnswer: "Mount Everest"
          },
          {
            id: 8,
            question: "Which country is home to the kangaroo?",
            options: ["New Zealand", "South Africa", "Australia", "Brazil"],
            correctAnswer: "Australia"
          },
          {
            id: 9,
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
          },
          {
            id: 10,
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correctAnswer: "William Shakespeare"
          }
        ];

       await new Promise(resolve => setTimeout(resolve, 1000)); //1s delay
        setQuestions(mockQuestions);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading, error };
};

export default useFetchQuestions;