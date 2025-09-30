# spec/dummy/config/initializers/file_exists_patch.rb

# Monkey-patch the File.exists? method, which was removed in Ruby 3.2.
# This is required to keep pre-rails 7.2 / ruby 3.2 tests running.
class File
  class << self
    unless method_defined?(:exists?)
      alias_method :exists?, :exist?
    end
  end
end
