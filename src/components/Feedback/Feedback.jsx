import React, { Component } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Section from '../Section/Section';
import Notification from '../Notification/Notification';

class FeedBack extends Component {
  state = {
    Good: 0,
    Neutral: 0,
    Bad: 0,
  };

  handleFeedback = type => {
    this.setState(prevState => ({
      [type]: prevState[type] + 1,
    }));
  };
  countTotalFeedback() {
    const { Good, Neutral, Bad } = this.state;
    return Good + Neutral + Bad;
  }
  countPercentageFeedback() {
    const { Good } = this.state;
    const totalFeedback = this.countTotalFeedback();
    return totalFeedback === 0 ? 0 : Math.ceil((Good / totalFeedback) * 100);
  }
  render() {
    const { Good, Neutral, Bad } = this.state;
    const totalFeedback = this.countTotalFeedback();
    const percentageFeedback = this.countPercentageFeedback();

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={['Good', 'Neutral', 'Bad']}
            onLeaveFeedback={this.handleFeedback}
          />
        </Section>
        <Section title="Statistics">
          {totalFeedback > 0 ? (
            <Statistics
              good={Good}
              neutral={Neutral}
              bad={Bad}
              total={totalFeedback}
              positivePercentage={percentageFeedback}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </div>
    );
  }
}

export default FeedBack;
