require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
require 'active_admin/globalize'

module Dummy
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.default_locale = :en
    config.i18n.available_locales = [:de, :en, :hu, :it, :'pt-BR', :'pt-PT']

    sl3 = config.active_record.sqlite3
    if sl3.present? && Rails::VERSION::MAJOR < 6
      sl3.represent_boolean_as_integer = true
    end

    if (Rails::VERSION::MAJOR == 6 && Rails::VERSION::MINOR >= 1) || (Rails::VERSION::MAJOR == 7 && Rails::VERSION::MINOR < 1)
      config.active_record.legacy_connection_handling = false
    end
  end
end
