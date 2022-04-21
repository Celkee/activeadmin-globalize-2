$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'active_admin/globalize/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'activeadmin-globalize-2'
  s.version     = ActiveAdmin::Globalize::VERSION
  s.authors     = ['Stefano Verna', 'Fabio Napoleoni', 'tkalliom']
  s.homepage    = 'http://github.com/Celkee/activeadmin-globalize-2'
  s.summary     = 'Handles globalize translations'
  s.description = 'Handles globalize translations in ActiveAdmin >=1.3 and Rails 5.2'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*'] + %w(MIT-LICENSE README.md)

  s.add_dependency 'activeadmin', '>= 1.3', '< 2.0'
  s.add_dependency 'globalize', '>= 5.2', '< 6.0'

  # development dependencies
  s.add_development_dependency 'bundler', '>= 2.0.2'
  s.add_development_dependency 'rake'
  # Other development dependencies moved into Gemfile

end
