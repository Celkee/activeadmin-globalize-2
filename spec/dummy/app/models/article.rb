# frozen_string_literal: true

class Article < ActiveRecord::Base
  # Translated fields with globalize and for active admin
  active_admin_translates :title, :body

  class Translation
    def self.ransackable_attributes(_auth_object = nil)
      %w[article_id body created_at id id_value locale title updated_at]
    end
  end

  def self.ransackable_associations(_auth_object = nil)
    %w[translations]
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at id id_value updated_at] + _ransackers.keys
  end
end
