import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { CreateUser } from '@/core/types/user'

export type OutsideRegister<A> = (data: CreateUser) => Promise<A>

type Register = <A>(outsideRegister: OutsideRegister<A>) => 
(data: CreateUser) => TE.TaskEither<Error, A>

export const register: Register = (outsideRegister) => (data) => {
  return pipe(
    TE.tryCatch(
      () => outsideRegister(data),
      E.toError,
    ),
  )
}

//Option
// const number = 0;
// const numberOption =  O.fromNullable(number)

// if(O.isSome(numberOption)) {
//   numberOption.
// }

//Either
// function throwError () {
//   throw new Error('deu erro')
// }

// const result = E.tryCatch(throwError())

// if(E.isRight(result)) {
//   result.right
// } else {
//   result.left
// }

//Task
// function isURL (url ) {
//   try {
//     const url = new URL(url)
//     return true
//   } catch (error) {
//     return false
//   }
// }
