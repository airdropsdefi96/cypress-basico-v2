/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {

        cy.visit("src/index.html")

      })
    
    
    it('verifica o título da aplicação', function() {
               
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
               
        cy.get('#firstName').type('Alysson')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('alyssonsantana@gmail.com')
        cy.get('#open-text-area').type('Favor entrar em contato por e-mail', {delay: 0})
       
        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
               
        cy.get('#firstName').type('Alysson')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('alyssonsantanagmailcom')
        cy.get('#open-text-area').type('Favor entrar em contato por e-mail', {delay: 0})

        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    
    })

    it('não preenchimento do campo telefone com valores não-numéricos', function() {
               
        cy.get('#phone').type('ASD!@#').should('have.value', '')
      
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
               
        cy.get('#phone-checkbox').check()

        cy.get('#firstName').type('Alysson')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('alyssonsantana@gmail.com')
        cy.get('#open-text-area').type('Favor entrar em contato por e-mail')

        cy.get('.button').click()

        cy.get('.error').should('be.visible')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
               
        cy.get('#phone-checkbox').check()

        cy.get('#firstName').type('Alysson').should('have.value', 'Alysson').clear().should('have.value', '')
        cy.get('#lastName').type('Santana').should('have.value', 'Santana').clear().should('have.value', '')
        cy.get('#email').type('alyssonsantana@gmail.com').should('have.value', 'alyssonsantana@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('91919191').should('have.value', '91919191').clear().should('have.value', '')
        
    })

    Cypress._.times(5, () => {
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()     
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.tick(2999)
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })
    });

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit('Alysson','Santana','as@gmail.com','Texto qualquer')
        
        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    })


    it('envia o formuário com sucesso usando o comando cy.contains', function() {
        cy.fillMandatoryFieldsAndSubmit('Alysson','Santana','as@gmail.com','Texto qualquer')
        
        cy.contains('Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback', function() {
        cy.get('input[type=radio][value=feedback]').check().should('have.value', 'feedback')
        
    })

    it('marca cada tipo de atendimento' , function() {
        cy.get('input[type=radio]').each(function(radio){
            cy.wrap(radio).check()
            cy.wrap(radio).should('be.checked')
        })   
    })

    it('marca ambos checkboxes, depois desmarca o último' , function() {
        cy.get('input[type=checkbox]').each(function(checkboxes){
            cy.wrap(checkboxes).check()
            cy.wrap(checkboxes).should('be.checked')
        })
        cy.get('input[type=checkbox]').last().uncheck().should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json').should(input => {
            expect(input[0].files[0].name).be.eq('example.json')
       
        }) 
    })

    it('seleciona um arquivo simulando um drag-and-drop' , function() {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop'}).should(input => {
            expect(input[0].files[0].name).be.eq('example.json')
       
        })  
    })


    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias' , function() {
        cy.fixture('example.json').as('fileToUpload')

        cy.get('#file-upload').selectFile('@fileToUpload').should(input => {
            expect(input[0].files[0].name).be.eq('example.json')
       
        })  
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a').should('have.attr', 'target', '_blank')
               
     })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
       cy.get('a').invoke('removeAttr', 'target').click()
       cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
       
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche a area de texto usando o comando invoke', function() {
               
        cy.get('#firstName').invoke('val', 'Alysson').should('have.value', 'Alysson')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('alyssonsantana@gmail.com')
        cy.get('#open-text-area').type('Favor entrar em contato por e-mail', {delay: 0})
       
        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    
    })

    it('faz uma requisição HTTP', function() {

        cy.request('GET', 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').then((response) => {
            expect(response.status).be.eq(200)
            expect(response.statusText).be.eq('OK')
            expect(response.body).contain('CAC TAT')
            
        }) 
    })

    it('pega o gato MIAAAU', function() {
        cy.get('#cat').invoke('show').should('be.visible')
    })
})


  