import request from 'superagent'
import { RandomWord, CheckGuessResult } from '../../models/word'

const rootURL = new URL(`/api/v1`, document.baseURI)

// function calling the backend/server to get one random word
export async function getRandomWord(): Promise<RandomWord> {
  const response = await request.get(`${rootURL}/words/random`)
  return response.body as RandomWord
}

// function calling the backend/server to get a word by its id
// used when the player clicks give up & needs to see what the word is
export async function revealWord(id: number): Promise<string> {
  const response = await request.get(`${rootURL}/words/${id}/reveal`)
  return response.body.word
}

// function calling the backend/server to check a guess against the correct word
export async function checkGuess(
  wordId: number,
  guess: string,
): Promise<CheckGuessResult> {
  const response = await request
    .post(`${rootURL}/words/check`)
    .send({ wordId, guess })
  return response.body as CheckGuessResult
}

// submits a completed game (win only) — records how long it took and which word
export async function submitGame(
  {
    wordId,
    startTime,
    endTime,
  }: { wordId: number; startTime: Date; endTime: Date },
  token: string,
): Promise<void> {
  await request
    .post(`${rootURL}/words/games`)
    .set('Authorization', `Bearer ${token}`)
    .send({ wordId, startTime, endTime })
}
