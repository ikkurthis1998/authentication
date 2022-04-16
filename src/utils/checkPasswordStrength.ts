import zxcvbn from "zxcvbn";
import { httpStatusCode } from "./httpStatusCode";
import { log } from "./logger";

export const checkPasswordStrength = ({
	password,
	traceId
}: {
	password: string;
	traceId: string;
}) => {
    log.info(`[${traceId}] [checkPasswordStrength] [START]`);

	if (password && password.length < 8) {
		log.error(
			`[${traceId}] [checkPasswordStrength] [ERROR] Password length must be at least 8 characters`
		);
        return {
            error: {
                status: httpStatusCode.BAD_REQUEST,
                message: "Password length must be at least 8 characters"
            }
        }
	}

	if (password && password.length > 32) {
		log.error(
			`[${traceId}] [checkPasswordStrength] [ERROR] Password length must be less than 32 characters`
		);
        return {
            error: {
                status: httpStatusCode.BAD_REQUEST,
                message: "Password length must be less than 32 characters"
            }
        }
	}

	const lowerCaseRegex = /^(?=.*[a-z]).+$/;

	const upperCaseRegex = /^(?=.*[A-Z]).+$/;

	const numberRegex = /^(?=.*[0-9]).+$/;

	const specialCharRegex = /^(?=.*[-+_!@#$%^&*.,?\\]).+$/;

	if (!lowerCaseRegex.test(password)) {
		log.error(
			`[${traceId}] [checkPasswordStrength] [ERROR] Password must contain at least one lower case character`
		);
        return {
            error: {
                status: httpStatusCode.BAD_REQUEST,
                message: "Password must contain at least one lower case character"
            }
        }
	}

	if (!upperCaseRegex.test(password)) {
		log.error(
			`[${traceId}] [checkPasswordStrength] [ERROR] Password must contain at least one upper case character`
		);
        return {
            error: {
                status: httpStatusCode.BAD_REQUEST,
                message: "Password must contain at least one upper case character"
            }
        }
	}

	if (!numberRegex.test(password)) {
        log.error(
			`[${traceId}] [checkPasswordStrength] [ERROR] Password must contain at least one number`
		);
        return {
            error: {
                status: httpStatusCode.BAD_REQUEST,
                message: "Password must contain at least one number"
            }
        }
	}

	if (!specialCharRegex.test(password)) {
        log.error(
            `[${traceId}] [checkPasswordStrength] [ERROR] Password must contain at least one special character`
        );
        return {
            error: {
                status: httpStatusCode.BAD_REQUEST,
                message: "Password must contain at least one special character"
            }
        }
	}

	const { score, feedback } = zxcvbn(password);

	if (score <= 2) {
        log.error(
            `[${traceId}] [checkPasswordStrength] [ERROR] ${feedback.warning}`
        );
        return {
            error: {
                status: httpStatusCode.BAD_REQUEST,
                message: feedback.warning,
                data: {
                    score,
                    feedback
                }
            }
        }
	}

	log.info(`[${traceId}] [checkPasswordStrength] [END]`);
	return {
        data: {
            score,
            feedback
        }
	};
};
