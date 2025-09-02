# frozen_string_literal: true

appraise 'rails5_2' do
  gem 'rails', '~> 5.2.7'
  gem 'activeadmin', '~> 1.4.3'
end

appraise 'rails6_0' do
  gem 'rails', '~> 6.0.4'
  gem 'activeadmin', '~> 2.2.0'
end

appraise 'rails6_1' do
  gem 'rails', '~> 6.1.5'
  gem 'activeadmin', '~> 2.9.0'

  group :test do
    gem 'capybara', '~> 3.33'
    gem 'selenium-webdriver', '~> 4.1.0'
    gem 'puma'
  end
end

appraise 'rails7_0' do
  gem 'rails', '~> 7.0.2'
  gem 'activeadmin', '~> 2.12.0'

  group :test do
    gem 'capybara', '~> 3.33'
    gem 'selenium-webdriver', '~> 4.1.0'
    gem 'puma'
  end
end

appraise 'rails7_1' do
  gem 'rails', '~> 7.1'
  gem 'activeadmin', '~> 3.3.0'

  group :test do
    gem 'capybara', '~> 3.33'
    gem 'selenium-webdriver', '~> 4.26.0'
    gem 'puma', '~> 7.0.2'
  end
end
