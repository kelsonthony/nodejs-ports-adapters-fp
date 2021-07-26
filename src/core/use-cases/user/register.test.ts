import { register, OutsideRegister } from './register'
import { CreateUser } from '@/core/types/user'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'


const registerOk: OutsideRegister<string> = async (data) => {
  return `Usuário ${data.username} cadastrado com sucesso!`
}

const data: CreateUser = {
  username: 'john',
  email: 'jhon@hotmail.com',
  password: '123456'
}

it('Deveria cadastrar um usuário com sucesso', async () => {
  return pipe(
    data, 
    register(registerOk),
    TE.map(result => expect(result).toBe(`Usuário ${data.username} cadastrado com sucesso!`))
  )()
})