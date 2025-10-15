import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
//import ClienteForm from '../src/app/cadastro/page'
import Cadastro from '../src/app/cadastro/page'

describe('cadastro', () => {
  it('renderiza sem erros', () => {
    render(<Cadastro />)
  })
})
