describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jean Huynh',
      username: 'feilong',
      password: 'doubidouba'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const anotherUser = {
      name: 'Xin Huang',
      username: 'jimini',
      password: 'hihouhahou'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)

    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.get('#login-form')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('feilong')
      cy.get('#password').type('doubidouba')
      cy.get('#login-btn').click()
      cy.get('#login-form')
      cy.get('.success')
        .should('contain', 'successfully logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('xinou')
      cy.get('#password').type('poupidoupidou')
      cy.get('#login-btn').click()
      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'feilong', password: 'doubidouba' })
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()

        cy.get('#title').type('互いの宇宙')
        cy.get('#author').type('JYOCHO')
        cy.get('#url').type('https://youtu.be/Rv1B1ot5tSU')
        cy.get('#create-blog-btn').click()

        cy.get('.success')
          .should('contain', 'a new blog 互いの宇宙 by JYOCHO added')
          .and('have.css', 'color', 'rgb(0, 128, 0)')

        cy.get('.blog:last')
          .should('contain', '互いの宇宙 JYOCHO')
      })

      describe('and a blog exists', function() {
        beforeEach(function() {
          cy.createNote({
            title: '互いの宇宙',
            author: 'JYOCHO',
            url: 'https://youtu.be/Rv1B1ot5tSU'
          })
        })

        it('it can be liked', function() {
          cy.get('.blog:last')
            .get('.toggleBtn')
            .click()
          cy.get('.likeBtn')
            .click()
          cy.get('.likeDiv')
            .should('contain', 'likes 1')
        })

        it('it can be removed by its creator', function() {
          cy.get('.blog:last')
            .should('contain', '互いの宇宙 JYOCHO')
            .get('.toggleBtn')
            .click()

          cy.get('.removeBtn')
            .click()
          cy.wait(1000)
          cy.get('#blog-list').should('not.contain', '互いの宇宙 JYOCHO')
        })

        describe('and another blog is added by another user', function() {
          beforeEach(function() {
            cy.login({ username: 'jimini', password: 'hihouhahou' })
            cy.createNote({
              title: 'グッドバイ',
              author: 'toe',
              url: 'https://youtu.be/e1pZIfretEs'
            })
          })
          it('delete button not visible if user is not the creator', function() {
            cy.contains('互いの宇宙 JYOCHO')
              .contains('view')
              .click()

            cy.contains('互いの宇宙 JYOCHO')
              .should('not.contain', 'remove')

            cy.contains('グッドバイ toe')
              .contains('view')
              .click()

            cy.contains('グッドバイ toe')
              .should('contain', 'remove')
          })
          it('Blogs must be sorted by likes', function() {
            cy.contains('互いの宇宙 JYOCHO')
              .contains('view')
              .click()

            cy.contains('グッドバイ toe')
              .contains('view')
              .click()

            cy.contains('互いの宇宙 JYOCHO')
              .contains('like')
              .click()

            cy.get('.blog').eq(0).should('contain', '互いの宇宙 JYOCHO')
            cy.get('.blog').eq(1).should('contain', 'グッドバイ toe')

            cy.contains('グッドバイ toe')
              .contains('like')
              .click()
              .click()

            cy.get('.blog').eq(0).should('contain', 'グッドバイ toe')
            cy.get('.blog').eq(1).should('contain', '互いの宇宙 JYOCHO')
          })
        })
      })
    })
  })
})
