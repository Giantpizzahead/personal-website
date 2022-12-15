module Jekyll
  class AlertBlock < Liquid::Block

    def initialize(tag_name, input, tokens)
      super
      @input = input
    end

    def render(context)
      # Switch statemenet based on input value
      case @input
      when "info"
        alert_class = "info-msg"
      when "success"
        alert_class = "success-msg"
      when "warning"
        alert_class = "warning-msg"
      when "danger"
        alert_class = "danger-msg"
      else
        # Default to info
        alert_class = "alert-info"
      end

      # Render the block
      return "<div class=\"alert #{alert_class}\" role=\"alert\">
      text = super
      "<p>#{text} #{Time.now}</p>"
    end

  end
end

Liquid::Template.register_tag('alert', Jekyll::AlertBlock)
  