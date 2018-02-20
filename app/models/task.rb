class Task < ApplicationRecord
  validates :text, presence: true
  def as_json
    {
      id: id,
      text: text,
      completed: completed
    }
  end
end
