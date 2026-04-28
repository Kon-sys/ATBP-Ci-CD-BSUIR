Feature: Регистрация пользователя через API
  As a user
  I want to send registration data
  So that the system validates my credentials

  Scenario: Successful registration
    When I send valid registration data
    Then the API response status should be 200
    And the API response should contain success message

  Scenario: Registration with weak password
    When I send registration data with weak password
    Then the API response status should be 400
    And the API response should contain password validation error
